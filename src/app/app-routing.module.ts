import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])
const redirectLoggedInToTime = () => redirectLoggedInTo(['time'])

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'time' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), canActivate: [AuthGuard], data: {authGuardPipe: redirectLoggedInToTime} },
  { path: 'weather', loadChildren: () => import('./weather/weather.module').then(m => m.WeatherModule), canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin} },
  { path: 'time', loadChildren: () => import('./time/time.module').then(m => m.TimeModule), canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
