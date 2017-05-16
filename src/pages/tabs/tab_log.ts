import { Component } from '@angular/core';
import { NavParams  } from 'ionic-angular';
import { HomePage } from '../home/home';
import { User_info } from '../User_info/User_info';
import { Community } from '../Community/Community';

@Component({
  templateUrl: 'tab_log.html'

})
export class Tab_logPage {
	result: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = User_info;
  tab3Root: any = Community;

  constructor(public navParam:NavParams) {
  		this.result= this.navParam.data;
  		
  }
}