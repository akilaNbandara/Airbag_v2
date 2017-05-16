import { NgModule, ErrorHandler } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { User_info } from '../pages/User_info/User_info';
import {Community} from '../pages/Community/Community';
import {ModalContentPage} from '../pages/Community/Community'
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Tab_logPage } from '../pages/tabs/tab_log';
import { mapPage } from '../pages/map/map';
import { vo_signup } from '../pages/contact/vo_signup/vo_signup';
import { so_signup } from '../pages/contact/so_signup/so_signup';
import {vo_page_db} from '../pages/contact/vo_signup/vo_db';
import {so_page_db} from '../pages/contact/so_signup/so_page_db';
import {Connectivity} from '../providers/connectivity'
import {AS_popoverPage}from '../pages/map/add_station_popover/AS_popoverPage';
import {SS_db} from '../classes/db/SS_db';
import {VO_db} from '../classes/db/VO_db';
import {Post_db} from '../classes/db/Post_db'
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
    so_signup,
    AS_popoverPage,
    User_info,
    Tab_logPage,
    Community,
    ModalContentPage

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
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
    so_signup,
    AS_popoverPage,
    User_info,
    Tab_logPage,
    Community,
    ModalContentPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
  vo_page_db,so_page_db, Connectivity, SS_db, Vehicle, VO_db, Post_db ]
})
export class AppModule {}
