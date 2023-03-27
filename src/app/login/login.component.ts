import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { createMask } from "@ngneat/input-mask";
import { UntypedFormBuilder, Validators } from "@angular/forms";
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  viewPass: boolean = false
  loginEvent: boolean = true

  closeIcon: IconDefinition = faClose
  inputMask = createMask({alias: 'email'})

  constructor(private _fb: UntypedFormBuilder,
    private _logS: LoginService,
    private route: Router) { }

  form = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  ngOnInit(): void {
  }

  confirmReg(): void {
    this._logS.createAccount(this.form.value)
  }

  confirmAuth(): void {
    this._logS.login(this.form.value)
  }

  googleAuth(): void {
    this._logS.loginWithGoogle()
  }

  close(): void {
    this.route.navigateByUrl('/')
  }

}
