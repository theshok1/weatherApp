import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() menu = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  openMenu(): void {
    this.menu.emit()
  }

}
