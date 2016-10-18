import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {Addweather} from '../pages/addweather/addweather';
import {Openweather} from '../providers/openweather';
import { Forcast } from '../pages/forcast/forcast';
import {Storage} from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Addweather,
    Forcast
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Addweather,
    Forcast
  ],
  providers: [Openweather, Storage]
})
export class AppModule {}
