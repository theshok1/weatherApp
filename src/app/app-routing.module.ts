import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'time' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'weather', loadChildren: () => import('./weather/weather.module').then(m => m.WeatherModule), canActivate: [LoginGuard] },
  { path: 'time', loadChildren: () => import('./time/time.module').then(m => m.TimeModule), canActivate: [LoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
