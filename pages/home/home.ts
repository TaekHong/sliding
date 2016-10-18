import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';

import {Addweather} from '../addweather/addweather';
import {Openweather} from '../../providers/openweather';
import 'rxjs/add/operator/map';
import {Forcast} from '../forcast/forcast';
import {Geolocation} from 'ionic-native';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weatherList = [];
  localWeather;
  myslideoptions={pager:true};

  constructor(public navCtrl: NavController, public modalCtrl : ModalController, public weather : Openweather, public storage: Storage) {

    this.storage.set("Name", "Minho Shin");
    this.storage.get("Name").then(
      value => console.log(value)
    );

    this.storage.get("weathers").then(
      (value) => {
        this.weatherList = JSON.parse(value) || [];
        // value ? JSON.parse(value) : [];
      },
      (err) => { this.weatherList = []; console.log(err) }
    )
    Geolocation.getCurrentPosition().then(
      (resp) => {
        console.log(resp.coords.latitude);
        console.log(resp.coords.longitude);
        this.weather.getWeatherByLocation(resp.coords.latitude, resp.coords.longitude)
        .map(data => data.json())
        .subscribe( (data) => {
            this.localWeather = data;

        });
      }
     );
  }
  addWeather() {
     let m = this.modalCtrl.create(Addweather);
     m.onDidDismiss( (data) => {
       this.getWeather(data.city, data.country);
     })
     m.present();
  }
  remove(weather){
    this.weatherList.splice(this.weatherList.indexOf(weather),1);
    this.storage.set("weathers", JSON.stringify(this.weatherList));
  }

  getWeather( city: string, country:string ) {
    this.weather.getWeatherByCity(city, country )
    .map( data => data.json() )
    .subscribe(
      data=> {
        this.weatherList.push(data);
        this.storage.set("weathers", JSON.stringify(this.weatherList));
      },
      err=> console.log(err)
    );
  }

  viewForcast(weather) {
    console.log(weather.name);
    this.navCtrl.push(Forcast, {weather: weather});
  }

}
