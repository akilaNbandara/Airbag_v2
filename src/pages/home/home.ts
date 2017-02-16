import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { mapPage } from '../map/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	mp=mapPage;

  constructor(public navCtrl: NavController) {

  }

}
