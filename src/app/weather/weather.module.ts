import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { WeatherService } from '../services/weather.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WeatherComponent
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule
  ],
  providers: [WeatherService]
})
export class WeatherModule { }
