import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng,
 CameraPosition,
 GoogleMapsMarkerOptions,
 GoogleMapsMarker
} from 'ionic-native';


 
@Component({
  selector: 'map',
  templateUrl: 'map.html',

})
export class mapPage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
   markers: any = [];
  constructor(public navCtrl: NavController) {
 
  }
 
  ngAfterViewInit(){
    
  	console.log('Map is viewinit!')
    this.loadMap();

  }
 
  loadMap(){
 
    let latLng = new google.maps.LatLng(6.9271, 79.8612);
 
    let mapOptions = {
      center: latLng,
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
}