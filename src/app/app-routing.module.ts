import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'weather', loadChildren: () => import('./weather/weather.module').then(m => m.WeatherModule) },
  { path: 'time', loadChildren: () => import('./time/time.module').then(m => m.TimeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
