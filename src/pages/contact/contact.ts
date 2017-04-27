import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import { vo_signup } from './vo_signup/vo_signup';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})


export class ContactPage {

	name: string ='';
	email_phone: string = '';
	password: string = '';
	re_password: string ='';
	re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	SignUpAs;
	vo_page=vo_signup;
  constructor(public navCtrl: NavController, public alCont:AlertController) {

  }

  next(){
  	if (this.name==='' || this.email_phone==='' ||
  	 	this.password==='' || this.re_password===''){

  		let alert = this.alCont.create({
      	title: 'Enter All Data',
      	subTitle: 'Please enter all requierd data for go to next step',
      	buttons: ['OK']
    	});
    	alert.present();
  	}else if ( /^\d+$/.test(this.email_phone)&&this.email_phone.length!=10) {
  		let alert = this.alCont.create({
      	title: 'Enter Valid Phone number',
      	subTitle: 'Please enter 10 digit phone number',
      	buttons: ['OK']
    	});
    	alert.present();
  		
  	}else if (!(/^\d+$/.test(this.email_phone))&& !(this.re.test(this.email_phone))){
  		let alert = this.alCont.create({
      	title: 'Enter Valid Email',
      	subTitle: 'Please enter valid email address like, "abcd@sample.com"',
      	buttons: ['OK']
    	});
    	alert.present();
  	}else if (this.password.length<4){
  		let alert = this.alCont.create({
      	title: 'Password is too short',
      	subTitle: 'Please re enter a password of minimum 4 charactors',
      	buttons: ['OK']
    	});
    	alert.present();
  	}else if (this.password!=this.re_password){
  		let alert = this.alCont.create({
      	title: 'Invalid password confirm',
      	subTitle: 'Please re enter password correctly',
      	buttons: ['OK']
    	});
    	alert.present();
  	}else{
  		let data= {name:this.name, email:null, phone:null, password:this.password};
  		
  		data.password=this.password;
  		if (/^\d+$/.test(this.email_phone)){
  			data.phone=this.email_phone;
  		}else{
  			data.email=this.email_phone;
  		}

  		if (this.SignUpAs=="vo"){

  			this.navCtrl.push(vo_signup, data);

  		}

  	}
  }

  

}
