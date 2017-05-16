import { Component } from '@angular/core';
import { Nav,NavParams  } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {TabsPage} from '../tabs/tabs';

@Component({
  templateUrl: 'User_info.html'
})


export class User_info {
	user: any;
	result: any;
	name: string;
	email: string;
	tele: string;
  type:string;
	

  constructor(public nav: Nav,public storage:Storage,public navPara:NavParams ) {

  	this.result=this.navPara.data;
  	let user=this.result.result.user;
    this.user=user;
  	this.name=user.name;
  	this.email=user.email;
  	this.tele=user.tele;
    this.type=this.result.type;
  	console.log(user)

  }

  logout(){

    this.storage.set('token', '');
  	this.nav.setRoot(TabsPage);
  }



   
  

}
