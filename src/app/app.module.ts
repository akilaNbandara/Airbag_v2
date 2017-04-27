import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { mapPage } from '../pages/map/map';
import { vo_signup } from '../pages/contact/vo_signup/vo_signup';
import {vo_page_db} from '../pages/contact/vo_signup/vo_db';
import {Connectivity} from '../providers/connectivity'
import {AS_popoverPage}from '../pages/map/add_station_popover/AS_popoverPage';
import {SS_db} from '../classes/db/SS_db';
import {VO_db} from '../classes/db/VO_db';
import {Vehicle} from '../classes/Vehicle'
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    mapPage,
    vo_signup,
    AS_popoverPage

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    mapPage,
    vo_signup,
    AS_popoverPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},vo_page_db, Connectivity, SS_db, Vehicle, VO_db ]
})
export class AppModule {}
