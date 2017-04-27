import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Vehicle_owner} from '../Vehicle_owner';
import 'rxjs/add/operator/map';


@Injectable()

export class VO_db{

	private VehiOwner_db: any;
 	
	private address: any;

	constructor(public http:Http ){

    this.address = 'http://localhost:8080/api/';
		
	}

	postVO(vehi_owner: Vehicle_owner){

		let headers = new Headers();
    	headers.append('Content-Type', 'application/json');
 
    	this.http.post(this.address+'vehicle_owner', 
    					JSON.stringify(vehi_owner), 
    					{headers: headers}).subscribe(res => {
        					console.log(res.json());
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

	

 }
