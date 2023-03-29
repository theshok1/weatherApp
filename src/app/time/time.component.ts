import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {

  date = new Date()

  title: string = 'Time'
  
  constructor () { }
  
  ngOnInit(): void {
    setInterval(() => {
      this.date = new Date()
    }, 1000)
  }

}
