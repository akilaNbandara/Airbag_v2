import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

	social_meadia: any;
  constructor(public navCtrl: NavController) {

  		console.log('testing sign up!')
  		this.social_meadia=[{name: 'FB',link: 'fb.com'}, {name: 'Twiter',link: '@ionic.com'}];
  }

}
