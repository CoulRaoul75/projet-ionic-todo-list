import { Component, OnInit, SystemJsNgModuleLoaderConfig } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModeleFormComponent } from 'src/app/modele-form/modele-form.component';
import { Plugins } from '@capacitor/core';
import { stringify } from 'querystring';

// après avoir importé tous les plugins capacitor, sélection du storage
const { Storage } = Plugins;
// création de la clé globale au fichier
const STORAGE_KEY = "taskList";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {

  public taskList = [
    { taskName: 'Nettoyer les écuries d\'Augias', done: false, id: 1 },
    { taskName: 'Résoudre le problème du réchauffement climatique', done: true, id: 2 }
  ];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    Storage.get({ key: STORAGE_KEY }).then(
      (data: any) => {
        console.log(data.value)
        this.taskList = JSON.parse(data.value) || [];
      }
    )
  }

  async addTask() {
    // afficher un form dans la page toDo
    // ouvrir une page dans une page => class modalControler
    const modal = await this.modalCtrl.create({
      component: ModeleFormComponent
    });

    modal.onDidDismiss().then(
      (res: any) => {
        res.data.id = (new Date()).getTime();
        console.log(res.data);
        if (res.data.taskName && res.data.taskName.trim() != "") {
          this.taskList.push(res.data);
          this.persist();
        }
      }
    )
    modal.present();
  }

  persist() {
    Storage.set({
      key: STORAGE_KEY,
      value: JSON.stringify(this.taskList)
    });

  }
}