import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']  
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.auth.register({
        nom: formData.nom!,
        prenom: formData.prenom!,
        email: formData.email!,
        motDePasse: formData.motDePasse!
      }).subscribe({
        next: (res) => {
          if (res.success) {
            alert('Registration successful!');
            this.router.navigate(['/login']);
          } else {
            alert(res.message || 'Registration failed.');
          }
        },
        error: (err) => {
          alert('An error occurred during registration.');
          console.error(err); // Log the error to the console for debugging
        }
      });
    }
  }

  // Navigate to the Login page
  navigateToLogin(): void {
    this.router.navigate(['/login']); // Angular Router navigation (no page reload)
  }
}
