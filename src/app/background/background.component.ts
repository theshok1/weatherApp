import { Component, OnInit } from '@angular/core';
import { Observable, of } from "rxjs";
import { Weather } from '../enums/weather';
import { OpenWeatherMap } from '../interfaces/open-weather-map';
import { WeatherProviderService } from '../services/weather-provider.service';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {
  bgs: {[key: string]: string} = {
    sunny: '../../assets/videos/sunny.mp4',
    rain: '../../assets/videos/rain.mp4',
    snow: '../../assets/videos/snow.mp4',
    storm: '../../assets/videos/storm.mp4',
    wind: '../../assets/videos/wind.mp4'
  }

  weathers: {[key: string]: string} = Object.assign(Weather)

  nowLink$: Observable<string> = of(this.bgs['sunny'])

  constructor(private _weatherS: WeatherService) {
    console.log(typeof Object.assign(Weather))
  }

  ngOnInit(): void {
    this._weatherS.weather.subscribe((res: OpenWeatherMap) => {
      this.nowLink$ = of(this.bgs[this.weathers[res.weather[0].main]])
    })
    this._weatherS.getCurentWeather()
  }

}
