import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjectIsInterfaceService {

  constructor() { }

  isOpenWeatherMap<T>(object: any): object is T {
    return 'weather' in object
  }
}
