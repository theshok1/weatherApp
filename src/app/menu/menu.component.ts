import { Component, OnInit, Input } from '@angular/core';
import { User } from '@angular/fire/auth';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() visible!: boolean
  user!: User | null

  arrowIcon: IconDefinition = faArrowRight

  constructor(private _logS: LoginService) {
    _logS.user$.subscribe(res => {
      this.user = res
    })
  }

  ngOnInit(): void {
  }

  signOut(): void {
    this._logS.signOut()
  }

}
