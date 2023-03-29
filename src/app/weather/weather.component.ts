import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  
  title: string = 'Weather'
  
  constructor(private _weather: WeatherService) {}
  
  ngOnInit(): void {
    this._weather.getCurentWeather().subscribe(res => {
      console.log(res)
    })
  }
}
