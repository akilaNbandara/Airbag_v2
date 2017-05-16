import { Component } from '@angular/core';
import { NavController,ToastController , NavParams , AlertController} from 'ionic-angular';
import {vo_page_db} from './vo_db';
import {Vehicle} from '../../../classes/Vehicle';
import {Vehicle_owner} from '../../../classes/Vehicle_owner';
import {VO_db} from '../../../classes/db/VO_db'
import {AboutPage} from '../../about/about'



@Component({
  selector: 'page-vo_signup',
  templateUrl: 'vo_signup.html'
})

export class vo_signup{

	type_dis: boolean = true;
	brandO: any;
	typeO: any;
	slctbr: any;

	Brand:string='';
	type: string='';
	modelNo: string;
	year:number;

	name:string;

	data: {name:string, email:string, phone:string, password:string}

	constructor(public navctrl_vo: NavController , public vo_db: vo_page_db, 
		public navPara: NavParams, public alertCtrl: AlertController, public vodb: VO_db, public tc: ToastController){

		this.vo_db.getBrands().then((data)=>{this.brandO=data});
		console.log(this.brandO);

		this.data=this.navPara.data;
		this.name=this.data.name;
		console.log(this.data);


	}



	brand_slct(br){
		this.type_dis= false;
		this.vo_db.gettypes(br).then((data)=>
			{console.log(data); 
			this.typeO=data});}

	
	createVo(){
		if(this.type==='' || this.Brand===''){
			let alert = this.alertCtrl.create({
      	title: 'Enter Required Data',
      	subTitle: 'Please select vehicle Brand and Type',
      	buttons: ['OK']
    	});
    	alert.present();
		}else{
			let vehi: Vehicle= new Vehicle(this.Brand, this.type, this.modelNo, this.year);
			
			let doo=this.data;

			let vhi_ow= new Vehicle_owner(doo.name,doo.password,vehi,doo.phone,doo.email);
			
			//console.log(vhi_ow,vehi);

			this.vodb.postVO(vhi_ow);
			  
			  let toast = this.tc.create({
			      message: 'User was added successfully  Please login with your account',
			      duration: 3000
			    });
			    toast.present();
			  

			this.navctrl_vo.push(AboutPage);
			
			/*if (msg.code==11000){
				let alert = this.alertCtrl.create({
		      	title: 'Invalid username or email or phone',
		      	subTitle: 'One of these are use by another user please add diferent ones',
		      	buttons: ['OK']
		    	});
		    	alert.present();
			}
		 	*/
		}
	}
}