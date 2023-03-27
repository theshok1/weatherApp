import { Component, OnInit } from '@angular/core';
import { Observable, of } from "rxjs";

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {
  bgs: {[key: string]: string} = {
    sunny: '../../assets/videos/sunny.mp4',
    rain: '../../assets/videos/rain.mp4',
    snow: '../../assets/videos/snow.mp4',
    storm: '../../assets/videos/storm.mp4',
    wind: '../../assets/videos/wind.mp4'
  }

  nowLink$: Observable<string> = of(this.bgs['sunny'])

  constructor() { }

  ngOnInit(): void {
  }

}
