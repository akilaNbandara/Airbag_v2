import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {ServiceStation} from '../ServiceStation';
import {maped_station} from '../maped_station';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()

export class SS_db{

	private data: any;
 	private datat: any;
	private address: any;
	private the_so: any;

	constructor(public http:Http , public storage: Storage){

    this.address = 'http://localhost:8080/api/';
		
	}

	postStation_owner(mp_st: ServiceStation){

/*		let headers = new Headers();
    	headers.append('Content-Type', 'application/json');
 
    	this.http.post(this.address+'station_owner', 
    					JSON.stringify(mp_st), 
    					{headers: headers}).subscribe(res => {
        					console.log(res.json());
      					}); */
	

    return new Promise((resolve,reject)=>{
      let headers = new Headers();
      headers.append('Content-Type','application/json');

      this.http.post(this.address+'station_owner',JSON.stringify(mp_st),{headers:headers})
        .subscribe(res=>{
          let data = res.json();
          this.the_so = data.token;
          this.storage.set('token', data.token);
          //console.log(data.token);
          console.log('methana res SSdb'+ data);
          resolve(data)
          return(data.user);
          
          //resolve(res.json()); // ????
          },(err)=>{

          reject(err);
          console.log('methnath err SSdb' + err)
          });
    });




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
			this.http.get(this.address+'station_owner')
				.map(res => res.json())
				.subscribe((data)=>{
					this.data=data;
					resolve(this.data);
				});

		});

	}

  getStationmaped(){

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

	login(credentials){
		return new Promise((resolve,reject)=>{
      let headers = new Headers();
      headers.append('Content-Type','application/json');

      this.http.post(this.address+'station_owner/login',JSON.stringify(credentials),{headers:headers})
        .subscribe(res=>{
          let data = res.json();
          this.the_so = data.token;
          this.storage.set('token', data.token);
          //console.log(data.token);
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



  	checkAuthentication(){
 
    return new Promise((resolve, reject) => {
 
        //Load token if exists
        this.storage.get('token').then((value) => {
 
            this.the_so = value;
 
            let headers = new Headers();
            headers.append('Authorization', this.the_so);
 
            this.http.get(this.address+'station_owner/protected', {headers: headers})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                }); 
 
        });         
 
    });
 
  }

	

 }
