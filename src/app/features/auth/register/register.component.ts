import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../core/services/auth/firebase.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ){}
  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  err = ''

  register() {
    const { name, email, password } = this.registerForm.value
    if (name && email && password) {
      this.firebaseService.register(name, email, password).subscribe({
        next: (userCredential) => {
          alert("Register successfully!")
          this.router.navigate(['/login'])
        },
        error: (err) => this.err = err
      })
    } else {
      this.err = 'Please fill the information!'
    }
  }
}
