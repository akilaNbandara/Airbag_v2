import { Component } from '@angular/core';
import {VO_db} from '../../classes/db/VO_db';
import {SS_db} from '../../classes/db/SS_db';
import {Tab_logPage} from '../tabs/tab_log';
import {TabsPage} from '../tabs/tabs';
import { Nav, AlertController,LoadingController  } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})


export class AboutPage {

	SignUpAs:string='';
	name: string ='';
	password: string = '';
	logbutt_dis: boolean= false;
	loading: any;
	result: any;

  constructor(public nav: Nav , public alertCtrl: AlertController ,
  				public vodb: VO_db, public ssdb: SS_db, public loadingCtrl: LoadingController) {

  }

  login(){
  	if (this.SignUpAs==='' ||this.name==='' || this.password===''){
  		let alert = this.alertCtrl.create({
      	title: 'Enter All Data',
      	subTitle: 'Please fill all data',
      	buttons: ['OK']
    	});
    	alert.present();
  	}else{
  		if (this.SignUpAs=="vo"){

    			//this.vodb.login({name:this.name,password:this.password});
    			this.showLoader();
		 
		        let credentials = {
		            name: this.name,
		            password: this.password
		        };
		 
		        this.vodb.login(credentials).then((result) => {
		            this.loading.dismiss();
		            this.result=result;
		            console.log('result is '+result);
		            this.nav.setRoot(Tab_logPage,{result:result, type:'VO'});
		        }, (err) => {
		            this.loading.dismiss();
		            console.log(err);
		            let alert = this.alertCtrl.create({
			      	title: 'Username or password invalid',
			      	subTitle: 'Please enter your data again.',
			      	buttons: ['OK']
			    	});
			    	alert.present();
		        });

    	}if (this.SignUpAs=="sso"){

		        this.showLoader();
		 
		        let credentials = {
		            name: this.name,
		            password: this.password
		        };
		 
		        this.ssdb.login(credentials).then((result) => {
		            this.loading.dismiss();
		            this.result=result;
		            //console.log(result);
		            this.nav.setRoot(Tab_logPage,{result:result,type:'SO'});
		        }, (err) => {
		            this.loading.dismiss();
		          	console.log(err);
		            let alert = this.alertCtrl.create({
			      	title: 'Username or password invalid',
			      	subTitle: 'Please enter your data again.',
			      	buttons: ['OK']
			    	});
			    	alert.present();
		        });

		    }
  	}
  }

  showLoader(){
 
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
 
        this.loading.present();
 
    }

}
