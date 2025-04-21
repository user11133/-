import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // Import RouterModule here
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RouterModule],  // Add RouterModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jesser';
}
