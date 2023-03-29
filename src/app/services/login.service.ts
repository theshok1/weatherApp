import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, user, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, signOut } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { of } from 'rxjs';

interface authForm {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private auth: Auth = inject(Auth)
  user$ = user(this.auth)

  private googleProvider = new GoogleAuthProvider()

  constructor(private router: Router) {
  }

  createAccount(data: authForm): void {
    createUserWithEmailAndPassword(this.auth, data.email, data.password)
      .then((userCredential) => {
        this.user$ = of(userCredential.user)
      })
      .catch((error) => {
        console.log('error code: '+error.code+'\nerror message: '+error.message)
      })
  }

  login(data: authForm): void {
    signInWithEmailAndPassword(this.auth, data.email, data.password)
      .then((userCredential) => {
        this.user$ = of(userCredential.user)
      })
      .catch((error) => {
        console.log('error code: '+error.code+'\nerror message: '+error.message)
      })
  }

  loginWithGoogle(): void {
    signInWithRedirect(this.auth, this.googleProvider)
      .then((result: any) => {
        this.user$ = of(result.user)
      })
  }

  signOut(): void {
    signOut(this.auth)
      .then(() => {
        this.router.navigateByUrl('login')
      })
      .catch((error) => {
        console.log('error code: '+error.code+'\nerror message: '+error.message)
      })
  }

}
