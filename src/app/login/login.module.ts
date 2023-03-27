import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { LoginComponent } from './login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputMaskModule } from '@ngneat/input-mask';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    InputMaskModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
