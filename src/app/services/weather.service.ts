import { Injectable } from '@angular/core';
import { WeatherProviderService } from './weather-provider.service';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

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

  getCurentWeather(): Observable<any> {
    if (this.provider == 'WeatherAPI') {
      return this.getWeatherOfWeatherApi()
    } else {
      return this.getWeatherOfOpenWeatherMap()
    }
  }

  private getWeatherOfWeatherApi(): Observable<any> {
    return this.http.get(this.weatherApiLink, {params: {
      key: this.weatherApiKey,
      q: this.city,
      aqi: 'yes'
    }})
  }

  private getWeatherOfOpenWeatherMap(): Observable<any> {
    return this.http.get(this.openWeatherApiLink, {params: {
      q: this.city,
      appid: this.openWeatherApiKey,
      units: 'metric'
    }})
  }
}
