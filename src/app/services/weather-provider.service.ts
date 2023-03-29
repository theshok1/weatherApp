import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherProviderService {

  provider: BehaviorSubject<string> = new BehaviorSubject('openWeatherMap')
  city: BehaviorSubject<string> = new BehaviorSubject('London')

  constructor() {
  }

  changeProvider(provider: string): void {
    this.provider.next(provider)
  }

  changeCity(city: string): void {
    this.city.next(city)
  }
}
