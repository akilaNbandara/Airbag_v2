import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng,
 CameraPosition,
 GoogleMapsMarkerOptions,
 GoogleMapsMarker,
 Geolocation
} from 'ionic-native';
import {Connectivity} from '../../providers/connectivity';
import {AS_popoverPage} from './add_station_popover/AS_popoverPage';
import {SS_db} from '../../classes/db/SS_db';
import {maped_station} from '../../classes/maped_station';




declare var google;


 
@Component({
  selector: 'map',
  templateUrl: 'map.html',

})
export class mapPage {

    stName: string;
    tele: number;


    mp_st_name:any="Not included";
    mp_st_tele:any="Not included";
    mp_st_valid:any;

   @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

   @ViewChild('addStationDiv') addStationDiv: ElementRef;

   @ViewChild('slct_mp_stationDiv') slct_mp_stationDiv: ElementRef;
 
   @ViewChild('map') mapElement: ElementRef;


 


   private map: any;
   private markers: any = [];
   private mapInitialised: boolean = false;
   private mypoint: any;
   private slctpoint: any;
   private directionsService: any;
   private directionsDisplay: any;
   private slctMarker: any;
   private mp_station_array: Array<any>=[];


    


  constructor(public navCtrl: NavController , public conn_service: Connectivity, 
    public alertCtrl: AlertController, public ss_db: SS_db ) {

           this.ss_db.getStation().then((data) => { 
        for (let d of data){
          this.mp_station_array.push(d);
          console.log(d);
        };

      });
    
    //console.log(this.mp_station_array);
 
  }

  //=====Setting up map============================================//
 
  ngAfterViewInit(){
    
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

      // ------------adding markers-------------------------------------// 



       for(let mp_st of this.mp_station_array){
        this.add_mpStation_Makers(mp_st);
        };


        this.addMakers(position.coords.latitude,position.coords.longitude);

       //----------------------------------------------------------------//

      
      //console.log('map was created')

      resolve(true);

      }, (err) => {
        console.log(err);
      });


    })
 
      
   
  }
  //===========map setting up ending=============================================================//

  get_current_location(){
    if(Geolocation.getCurrentPosition()){
      return Geolocation.getCurrentPosition();
    }else{
     
    }
  }

  //mrker adding functions.. ** need to be modified ============================================//

  addMakers(lat: number, lng: number): void{

    let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(lat, lng);

    let maker = new google.maps.Marker({
      map: this.map, 
      animation: google.maps.Animation.DROP, 
      position:ionic});

    this.markers.push(maker);
  }

    //---------------maped station markers------------------------------------------------//

  add_mpStation_Makers(mp: any): void{
    if(mp.location){
      let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(mp.location.lat, mp.location.lng);

      let maker = new google.maps.Marker({
        map: this.map, 
        animation: google.maps.Animation.DROP, 
        position:ionic});

    this.addDiv(maker,mp);
    }

    //this.markers.push(maker);
  }
  addDiv(marker:any,mp:any){
        
    google.maps.event.addListener(marker,'click', ()=>{

        //this.slct_mp_stationDiv.nativeElement.style.display = "block";
        //this.slct_mp_stationDiv.nativeElement.style.display = "none";

        this.slctpoint=mp.location;
        this.mp_st_name=mp.name;
        this.mp_st_tele=mp.tele
        this.mp_st_valid=mp.validation;

        

        this.slct_mp_stationDiv.nativeElement.style.display = "block";

        const promise = new Promise((resolve, reject) => {
    // the resolve / reject functions control the fate of the promise
        });
        
        
        
        
        

      });
  }

  close_mp_stationDiv(){
    this.slct_mp_stationDiv.nativeElement.style.display = "none";
  }


  //=========================================================================================//


  //==========Connectivity checking functins================================================//

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
      this.addStationDiv.nativeElement.style.display="none";
        this.slct_mp_stationDiv.nativeElement.style.display = "none";
      }
    } 

    enableMap(): void {
        if(this.pleaseConnect){
        this.pleaseConnect.nativeElement.style.display = "none";
        this.addStationDiv.nativeElement.style.display="none";
        this.slct_mp_stationDiv.nativeElement.style.display = "none";
        }
    }

    //====end of connectivity checking=============================//


    //=====add marker to locate service station============================//

    addStation(){
 
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter(),
        draggable: true
      });         
      
      this.addInfoWindow(marker);
     
    }

    addInfoWindow(marker){

     google.maps.event.addListener(marker, 'click', () => {
        console.log(marker.position);
        this.slctpoint=new google.maps.LatLng(marker.position.lat(),marker.position.lng());
        this.slctMarker = marker;
        
        this.addStationDiv.nativeElement.style.display = "block";


      });
 
    }

    closeAddStationDiv(){
      this.addStationDiv.nativeElement.style.display="none";
      //clear a marker
      let index= this.markers.indexOf(this.slctMarker);
      this.slctMarker.setMap(null);
      this.markers.splice(index,1);
    }

    newStation(){
      //console.log(this.stName,this.tele);
      let maped_st=new maped_station(this.stName,this.slctpoint,this.tele);
      this.ss_db.postStation(maped_st);
      this.addStationDiv.nativeElement.style.display="none";
    }


    //======end of add new station=============================================================//


    //=============== get direction to the selected marker===================================//

   getdirection(){

      if(this.mypoint== null){
      let no_mypoint_alert = this.alertCtrl.create({
      title: 'Can\'t find your location',
      subTitle: 'Please turn on LOcation service And reload the map',
      buttons: ['OK']
      });
      no_mypoint_alert.present();
      }else if(this.slctpoint==null){
        let no_slctpoint_alert = this.alertCtrl.create({
        title: 'Please select a station',
        subTitle: 'Click on the marker to select station',
        buttons: ['OK']
        });
        no_slctpoint_alert.present();

      }else{

        if (this.directionsDisplay==null){

           this.directionsDisplay = new google.maps.DirectionsRenderer({
              map: this.map
            });

           var directionsDisplay =this.directionsDisplay;

          // Pass the directions request to the directions service.
          this.directionsService = new google.maps.DirectionsService();
          var directionsService=this.directionsService;

        }

       var directionsDisplay =this.directionsDisplay;
        var directionsService=this.directionsService;


      var request = {
          destination: this.slctpoint,
          origin: this.mypoint,
          travelMode: 'DRIVING'
        };

      directionsService.route(request, function(response, status) {
          if (status == 'OK') {
            // Display the route on the map.
            directionsDisplay.setDirections(response);
          }
      });


    }
  }

  //====end of direction service===========================================//
 }

 
/**  loadMap(){

    //let latlng = new google.maps.LatLng(0,0);

    let lat= new GoogleMapsLatLng(6.9271, 79.8612);


    
 
     //let latLng = new google.maps.LatLng(6.9271, 79.8612);
 
    let mapOptions = {
      center: lat,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(6.9271, 79.8612);

    let markerOptions: GoogleMapsMarkerOptions = {
   position: ionic,
   title: '1st point'
   };

  let maker = new google.maps.Marker({map: this.map, animation: google.maps.Animation.DROP, position:ionic});

    this.markers.push(maker);
}
}**/

/**let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(position.coords.latitude, position.coords.longitude);

    

    let maker = new google.maps.Marker({map: this.map, animation: google.maps.Animation.DROP, position:ionic});

    this.markers.push(maker);
    **/