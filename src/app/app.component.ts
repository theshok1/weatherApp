import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weatherApp';

  menuState: boolean = false

  openMenu(): void {
    this.menuState = !this.menuState
  }
}
