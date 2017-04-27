import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {maped_station} from '../maped_station';
import 'rxjs/add/operator/map';


@Injectable()

export class SS_db{

	private data: any;
 	private datat: any;
	private address: any;

	constructor(public http:Http ){

    this.address = 'http://localhost:8080/api/';
		
	}

	postStation(mp_st: maped_station){

		let headers = new Headers();
    	headers.append('Content-Type', 'application/json');
 
    	this.http.post(this.address+'maped_station', 
    					JSON.stringify(mp_st), 
    					{headers: headers}).subscribe(res => {
        					console.log(res.json());
      					});
	}

	getStation(){

		if (this.data!=undefined){
			return Promise.resolve(this.data);
		}

		return new Promise(resolve => {
			this.http.get(this.address+'maped_station')
				.map(res => res.json())
				.subscribe((data)=>{
					this.data=data;
					resolve(this.data);
				});

		});

	}

	

 }
