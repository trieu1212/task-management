import { Component } from '@angular/core';
import { FirebaseService } from './core/services/auth/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-management';

  isLoggedIn = false

  constructor(private firebaseService: FirebaseService) {
    this.isLoggedIn = this.firebaseService.isLoggedIn(); 
    this.firebaseService.getCurrentUser().subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }
}
