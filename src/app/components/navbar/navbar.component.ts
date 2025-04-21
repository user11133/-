import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone : true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule]
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false; // Default to false, will update after constructor

  // Inject AuthService and Router in the constructor
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Check authentication status after initialization
    this.isAuthenticated = this.authService.isLoggedIn();
  }

  login() {
    // Redirect to the login page
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false; // Update UI
    this.router.navigate(['/']); // Optionally navigate to home
  }
}
