import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Subject } from 'rxjs';
import { OpenWeatherMap } from '../interfaces/open-weather-map';
import { WeatherProviderService } from '../services/weather-provider.service';
import { WeatherService } from '../services/weather.service';
import { WeatherApi } from '../interfaces/weather-api';
import { ObjectIsInterfaceService } from '../services/object-is-interface.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  
  title: string = 'Weather'

  @ViewChild('cityInput') cityInput!: ElementRef<HTMLInputElement>
  private cityName: Subject<string> = new Subject<string>()

  date: Date = new Date()
  weatherProvider: string

  city: string = ''
  temp: string = ''
  pressure: string = ''
  weather: string = ''
  windSpeed: string = ''
  icon: string = ''
  
  constructor(private _weather: WeatherService,
    private _weatherProvS: WeatherProviderService,
    private _OIIS: ObjectIsInterfaceService) {
      this.weatherProvider = _weatherProvS.provider.getValue()
    }
  
  ngOnInit(): void {
    this.cityName.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      map(cityName => 
        this._weatherProvS.city.next(this.cityInput.nativeElement.value)
      )
    ).subscribe()
    this.getWeather()
    this._weather.getCurentWeather()
  }

  selectCity(): void {
    this.cityName.next(this.cityInput.nativeElement.value)
  }

  onSelectProvider(e: Event): void {
    this._weatherProvS.provider.next((e.target as HTMLSelectElement).value)
  }

  getWeather(): void {
    this._weather.weather.subscribe((res: OpenWeatherMap | WeatherApi) => {
      if (this._OIIS.isOpenWeatherMap<OpenWeatherMap>(res)) {
        this.cityInput.nativeElement.value = res.name
        this.city = res.name + ' ' + res.sys.country
        this.temp = res.main.temp.toFixed().toString() + '°'
        this.pressure = res.main.pressure.toString() + ' м.'
        this.weather = res.weather[0].main + '. ' + res.weather[0].description
        this.windSpeed = res.wind.speed.toString() + ' м/с'
        this.icon = 'https://openweathermap.org/img/wn/' + res.weather[0].icon + '@2x.png'
      } else {
        this.cityInput.nativeElement.value = res.location.name
        this.city = res.location.name + ', ' + res.location.country
        this.temp = res.current.temp_c.toFixed().toString() + '°'
        this.pressure = res.current.pressure_mb.toString() + ' м.'
        this.weather = res.current.condition.text
        this.windSpeed = (res.current.wind_kph / 3.6).toFixed().toString() + ' м/с'
        this.icon = res.current.condition.icon
      }
    })
  }
}
