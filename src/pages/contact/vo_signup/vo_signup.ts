import { Component } from '@angular/core';
import { NavController, NavParams , AlertController} from 'ionic-angular';
import {vo_page_db} from './vo_db';
import {Vehicle} from '../../../classes/Vehicle';
import {Vehicle_owner} from '../../../classes/Vehicle_owner';
import {VO_db} from '../../../classes/db/VO_db'



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

	data: {name:string, email:string, phone:string, password:string}

	constructor(public navctrl_vo: NavController , public vo_db: vo_page_db, 
		public navPara: NavParams, public alertCtrl: AlertController, public vodb: VO_db){

		this.vo_db.getBrands().then((data)=>{this.brandO=data});
		console.log(this.brandO);

		this.data=this.navPara.data;
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
			console.log(vehi);
			let doo=this.data;
			let vhi_ow= new Vehicle_owner(doo.name,doo.password,vehi,doo.phone,doo.email);
			this.vodb.postVO(vhi_ow); 
		}
	}
}