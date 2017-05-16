import { Component, ViewChild, ElementRef } from '@angular/core';
import { Nav,NavParams , AlertController } from 'ionic-angular';
import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng,
 CameraPosition,
 GoogleMapsMarkerOptions,
 GoogleMapsMarker,
 Geolocation
} from 'ionic-native';
import {Tab_logPage} from '../../tabs/tab_log';
import {Connectivity} from '../../../providers/connectivity';
import {SS_db} from '../../../classes/db/SS_db';
import {so_page_db} from './so_page_db';
import {ServiceStation} from '../../../classes/ServiceStation';

declare var google;

@Component({
  
  templateUrl: 'so_signup.html',

})
export class so_signup{
	@ViewChild('pleaseConnect') pleaseConnect: ElementRef;
	@ViewChild('map') mapElement: ElementRef;

	private mapInitialised: boolean = false;
	private mypoint: any;
	private map: any;
	private data: any;
	private name: string;
	private service_types: any;


	private type_of_service: string='';
	
	private ss_addres: string;
	private the_marker: any;

	constructor(public nav: Nav ,public navPara: NavParams, public conn_service: Connectivity, 
    public alertCtrl: AlertController, public ss_db: SS_db, public so_pg:so_page_db){
    	
    	this.so_pg.getBrands().then((data)=>{this.service_types=data});

      this.loadGoogleMaps()
		
		this.data=this.navPara.data;
		this.name=this.data.name;

	}

	createSo(){
		if(this.ss_addres==='' || this.type_of_service===''){
			let alert = this.alertCtrl.create({
		      	title: 'Enter Required Data',
		      	subTitle: 'Please select service type and add service station addres',
		      	buttons: ['OK']
	    	});
	    	alert.present();
		}else{
			let doo=this.data;
			let loc=new google.maps.LatLng(this.the_marker.position.lat(),this.the_marker.position.lng());
			let ss_ow= new ServiceStation(doo.name, doo.password, this.ss_addres, loc,
                                    this.type_of_service, doo.phone, doo.email);
			console.log(ss_ow);
			this.ss_db.postStation_owner(ss_ow);
      this.ss_db.postStation_owner(ss_ow).then((res) => {

                console.log(res);
                this.nav.setRoot(Tab_logPage,{result:res,type:'SO'});
                
            
                
            } , (err) => {

              console.log(err);
              let alert = this.alertCtrl.create({
              title: 'Register Error',
              subTitle: 'Username or email already exist. Please try diferent username or login with exiting account',
              buttons: ['OK']
            });
            alert.present();
                
                
            });    

		 
		}
	}

	


	//-----------Mappy things:P -----------------------------------//
	ngAfterViewInit(){
    this.mapElement.nativeElement.style.display = "block";
  	console.log('Map is viewinit!')
    this.loadGoogleMaps()

  	}

  	loadGoogleMaps(): Promise<any> {
    return new Promise((resolve) => {
    if(typeof google == "undefined" || typeof google.maps == "undefined"){
      console.log("Google maps JavaScript needs to be loaded.");
      this.disableMap();

      if(this.conn_service.isOnline()){
        window['mapInit'] = () => {
          this.initMap().then(() => {
          resolve(true);
          });
          this.enableMap();
        } 

        let script = document.createElement("script");
        script.id = "googleMaps";
        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        document.body.appendChild(script);

      }
    }else {
      if(this.conn_service.isOnline()){
      this.initMap();
      this.enableMap();
      } else {
      this.disableMap();
      }
      } this.addConnectivityListeners();
    });
  }

  addConnectivityListeners(): void {
    document.addEventListener('online', () => {
      console.log("online");
      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        }else {
          if(!this.mapInitialised){
        this.initMap();
        } this.enableMap();
        }
      }, 2000);
    }, false);
    document.addEventListener('offline', () => {
    console.log("offline");
    this.disableMap();
    }, false);
    }

    disableMap(): void {
      if(this.pleaseConnect){
      this.pleaseConnect.nativeElement.style.display = "block";
      }
    } 

    enableMap(): void {
        if(this.pleaseConnect){
        this.pleaseConnect.nativeElement.style.display = "none";
        
        
        }
    }

    initMap(): Promise<any>{

    this.mapInitialised = true;

    return new Promise((resolve) => {

      Geolocation.getCurrentPosition().then((position) => {
        let latLng;
      if (position){
        latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      }else{
        latLng = new google.maps.LatLng(6.7969,79.9018);
      }
      console.log("current position"+latLng);
      this.mypoint=latLng;
      //console.log(position.coords.latitude,position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


      this.addStation();

	      resolve(true);

	      }, (err) => {
	        console.log(err);
	      });


	    })
  	}
  	addStation(){
 
      this.the_marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter(),
        draggable: true
      });
     
    }

    //-------------------END of mappy things-----------------------//

    

}

