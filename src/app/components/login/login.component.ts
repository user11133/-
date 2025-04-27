// src/app/components/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Check if already logged in, redirect based on role
    if (this.auth.isLoggedIn()) {
      this.redirectBasedOnRole();
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, motDePasse } = this.loginForm.value;
      
      this.auth.login(email!, motDePasse!).subscribe({
        next: (res) => {
          this.loading = false;
          if (res.success) {
            this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
            
            // After successful login, redirect based on role
            this.redirectBasedOnRole();
          } else {
            this.snackBar.open(res.message || 'Login failed.', 'Close', { duration: 3000 });
          }
        },
        error: (err) => {
          this.loading = false;
          console.error('Login error:', err);
          this.snackBar.open('An error occurred during login.', 'Close', { duration: 3000 });
        }
      });
    } else {
      // Mark all fields as touched to trigger validation messages
      this.loginForm.markAllAsTouched();
    }
  }

  // Redirect based on user role
  redirectBasedOnRole(): void {
    if (this.auth.isAdmin()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/']);  // Redirect to accueil for regular users
    }
  }

  // Navigate to the Register page when clicked
  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}