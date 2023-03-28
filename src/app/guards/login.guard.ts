import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  private _logS: LoginService = inject(LoginService)

  constructor (private router: Router) {
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true | UrlTree {
      if (this._logS.isLoggedIn) {
        return true
      } else {
        return this.router.parseUrl('login')
      }
  }
  
}
