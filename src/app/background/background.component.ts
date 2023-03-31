import { Component, OnInit } from '@angular/core';
import { Observable, of } from "rxjs";
import { Weather } from '../enums/weather';
import { OpenWeatherMap } from '../interfaces/open-weather-map';
import { WeatherProviderService } from '../services/weather-provider.service';
import { WeatherService } from '../services/weather.service';
import { WeatherApi } from '../interfaces/weather-api';
import { ObjectIsInterfaceService } from '../services/object-is-interface.service';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {
  bgs: {[key: string]: string} = {
    sunny: 'sunny',
    rain: 'rain',
    snow: 'snow',
    storm: 'storm',
    wind: 'wind'
  }

  weathers: {[key: string]: string} = Object.assign(Weather)

  nowLink$: Observable<string> = of(this.bgs['sunny'])

  constructor(private _weatherS: WeatherService,
    private _OIIS: ObjectIsInterfaceService) {
  }

  ngOnInit(): void {
    this._weatherS.weather.subscribe((res: OpenWeatherMap | WeatherApi) => {
      if (this._OIIS.isOpenWeatherMap<OpenWeatherMap>(res)) {
        this.nowLink$ = of(this.bgs[this.weathers[res.weather[0].main]])
      } else {
        this.nowLink$ = of(this.bgs[this.weathers[res.current.condition.text.replace(/[\s]/g, '')]])
      }
    })
    this._weatherS.getCurentWeather()
  }

}
