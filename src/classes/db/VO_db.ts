import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Vehicle_owner} from '../Vehicle_owner';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()

export class VO_db{

	private VehiOwner_db: any;
 	
	private address: any;

	private the_vo: any;

	constructor(public http:Http, public storage: Storage ){

    this.address = 'http://localhost:8080/api/';
		
	}

	postVO(vehi_owner: Vehicle_owner){
		let msg;

		let headers = new Headers();
    	headers.append('Content-Type', 'application/json');
 
    	this.http.post(this.address+'vehicle_owner', 
    					JSON.stringify(vehi_owner), 
    					{headers: headers}).subscribe(res => {
        					console.log(res.json());
        					
			
      					});

		let vehi= vehi_owner.getP_Vehicle();
		let vehi_d= {username: vehi_owner.getusername(),
		brand: vehi.getbrand(),
		type: vehi.gettype(),
		year: vehi.getyear(),
		modelNo: vehi.getmodelNo()
		}
		this.http.post(this.address+'vehicle', 
			JSON.stringify(vehi_d), 
			{headers: headers}).subscribe(res => {
				console.log( res.json());
				});
		}
		

	getVO(){

		if (this.VehiOwner_db!=undefined){
			return Promise.resolve(this.VehiOwner_db);
		}

		return new Promise(resolve => {
			this.http.get(this.address+'vehicle_owner')
				.map(res => res.json())
				.subscribe((data)=>{
					this.VehiOwner_db=data;
					resolve(this.VehiOwner_db);
				});

		});

	}

	login(credentials: {name:string,password:string}){
	  return new Promise((resolve,reject)=>{
      let headers = new Headers();
      headers.append('Content-Type','application/json');

      this.http.post(this.address+'vehicle_owner/login',JSON.stringify(credentials),{headers:headers})
        .subscribe(res=>{
          let data = res.json();
          this.the_vo = data.token;
          this.storage.set('token', data.token);
          console.log(data.token);
          resolve(data);
          //resolve(res.json()); // ????
        },(err)=>{
          reject(err);
        });
    });

	}

    logout(){
    this.storage.set('token', '');
  	}

	

 }
