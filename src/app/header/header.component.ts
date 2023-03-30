import { Component, Output, EventEmitter } from '@angular/core';
import { WeatherProviderService } from '../services/weather-provider.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() menu = new EventEmitter()

  city!: string

  constructor(private _weatherProvS: WeatherProviderService) {
    _weatherProvS.city.subscribe(res => {
      this.city = res
    })
  }

  openMenu(): void {
    this.menu.emit()
  }

}
