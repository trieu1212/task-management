import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../core/services/auth/firebase.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  navigateTab(route: string) {
    this.router.navigate([route])
  }

  onLogout(){
    this.firebaseService.logout()
  }
}
