import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Subject, switchMap } from 'rxjs';
import { OpenWeatherMap } from '../interfaces/open-weather-map';
import { WeatherProviderService } from '../services/weather-provider.service';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  
  title: string = 'Weather'

  @ViewChild('cityInput') cityInput!: ElementRef<HTMLInputElement>
  private cityName: Subject<string> = new Subject<string>()

  date: Date = new Date()

  city: string = ''
  country: string = ''
  temp: string = ''
  pressure: string = ''
  weather: string = ''
  windSpeed: string = ''
  icon: string = ''
  
  constructor(private _weather: WeatherService,
    private _weatherProvS: WeatherProviderService) {}
  
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

  getWeather(): void {
    this._weather.weather.subscribe((res: OpenWeatherMap) => {
      console.log(res)
      this.cityInput.nativeElement.value = res.name
      this.city = res.name
      this.country = res.sys.country
      this.temp = res.main.temp.toFixed().toString() + '°'
      this.pressure = res.main.pressure.toString() + ' м.'
      this.weather = res.weather[0].main + '. ' + res.weather[0].description
      this.windSpeed = res.wind.speed.toString() + ' м/с'
      this.icon = res.weather[0].icon
    })
  }
}
