// src/app/components/unauthorized/unauthorized.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container py-5 text-center">
      <div class="row">
        <div class="col-md-8 mx-auto">
          <div class="card">
            <div class="card-body">
              <i class="bi bi-exclamation-triangle text-warning display-4"></i>
              <h2 class="mt-3">Unauthorized Access</h2>
              <p class="mt-3">
                Sorry, you don't have permission to view this page. 
                Administrator privileges are required.
              </p>
              <a routerLink="/" class="btn btn-primary mt-3">Return to Home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UnauthorizedComponent {}