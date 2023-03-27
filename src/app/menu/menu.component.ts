import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {

  @Input() visible!: boolean

  arrowIcon: IconDefinition = faArrowRight

  constructor(private _logS: LoginService) { }

  ngOnInit(): void {
  }

  signOut(): void {
    this._logS.signOut()
  }

}
