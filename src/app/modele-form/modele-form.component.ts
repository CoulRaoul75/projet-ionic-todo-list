import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modele-form',
  templateUrl: './modele-form.component.html',
  styleUrls: ['./modele-form.component.scss'],
})
export class ModeleFormComponent implements OnInit {

  public task = {
    taskName: null,
    done: false
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  validateForm(){
    this.modalCtrl.dismiss(this.task);
  }

}
