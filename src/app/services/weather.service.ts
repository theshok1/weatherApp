import { Injectable } from '@angular/core';
import { WeatherProviderService } from './weather-provider.service';
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from 'rxjs';
import { OpenWeatherMap } from '../interfaces/open-weather-map';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherApiLink: string = 'http://api.weatherapi.com/v1/current.json'
  private weatherApiKey: string = 'c782cef9fdb5422bb88220756232903'

  private openWeatherApiLink: string = 'https://api.openweathermap.org/data/2.5/weather'
  private openWeatherApiKey: string = 'c44ce23989ef27dbdc918588e6eabfa8'

  private city: string = this._weatherProv.city.value
  private provider: string = this._weatherProv.provider.value

  weather: BehaviorSubject<OpenWeatherMap | any> = new BehaviorSubject('')

  constructor(private _weatherProv: WeatherProviderService,
    private http: HttpClient) {
    _weatherProv.city.subscribe((res: string) => {
      if (this.city != res) {
        this.city = res
        this.getCurentWeather()
      }
    })
    _weatherProv.provider.subscribe((res: string) => {
      if (this.provider != res) {
        this.provider = res
        this.getCurentWeather()
      }
    })
  }

  getCurentWeather(): void {
    if (this.provider == 'WeatherAPI') {
      this.getWeatherOfWeatherApi()
    } else {
      this.getWeatherOfOpenWeatherMap()
    }
  }

  private getWeatherOfWeatherApi(): void {
    this.http.get(this.weatherApiLink, {params: {
      key: this.weatherApiKey,
      q: this.city,
      aqi: 'yes'
    }}).subscribe(res => {
      this.weather.next(res)
    })
  }

  private getWeatherOfOpenWeatherMap(): void {
    this.http.get<OpenWeatherMap>(this.openWeatherApiLink, {params: {
      q: this.city,
      appid: this.openWeatherApiKey,
      units: 'metric'
    }}).subscribe(res => {
      this.weather.next(res)
    })
  }
}
