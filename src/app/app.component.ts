import { Component, HostListener } from '@angular/core';

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

  @HostListener('window:click', ['$event'])
  onClick(e: any): void {
    if (this.menuState && e.target.id != 'menu' && e.target.id != 'menuButton') {
      this.menuState = false
    }
  }
}
