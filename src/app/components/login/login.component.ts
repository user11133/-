// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, motDePasse } = this.loginForm.value;
      this.auth.login(email!, motDePasse!).subscribe({
        next: (res) => {
          if (res.success) {
            this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
            this.router.navigate(['/  ']);
          } else {
            this.snackBar.open(res.message || 'Login failed.', 'Close', { duration: 3000 });
          }
        },
        error: () => {
          this.snackBar.open('An error occurred during login.', 'Close', { duration: 3000 });
        }
      });
    }
  }

  // Navigate to the Register page when clicked
  navigateToRegister(): void {
    this.router.navigate(['/register']);  // Angular Router navigation (no page reload)
  }
}
