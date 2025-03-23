import { Component } from '@angular/core';
import { FirebaseService } from '../../../core/services/auth/firebase.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ){}

  loginForm = new FormGroup({
    email: new FormControl (''),
    password: new FormControl('')
  })
  err = ''

  login() {
    const {email, password} = this.loginForm.value
    if (email && password) {
      this.firebaseService.login(email,password).subscribe({
        next: () => {
          alert("Login successfully!")
          this.router.navigate(['/home'])
        },
        error: (err) => (this.err = err)
      })
    } else {
      this.err = "Please fill the information!"
    }
  }
}
