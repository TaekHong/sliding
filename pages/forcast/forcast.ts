import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {Openweather} from '../../providers/openweather';

/*
  Generated class for the Forcast page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forcast',
  templateUrl: 'forcast.html'
})
export class Forcast {
  cityWeather;
  forcast = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public weather : Openweather) {
    this.cityWeather = navParams.get('weather');
    this.getForcast(this.cityWeather.id);
  }

  getForcast(cityId) {
    this.weather.getForcastByCityID(cityId, 7 )
    .map( data => data.json() )
    .subscribe(
      data=> {
        this.forcast = data.list;
      },
      err=> console.log(err),
      () => console.log('forcast complete')
    );
  }

}
