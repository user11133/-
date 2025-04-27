import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Import and Module!
import { HotelService, Hotel } from './../../services/hotel.service'; // HotelService and Hotel

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule], // Import both CommonModule and MatSnackBarModule
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[] = [];

  constructor(
    private hotelService: HotelService, // Inject HotelService
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    this.hotelService.getHotels().subscribe({
      next: (data: Hotel[]) => {
        this.hotels = data;
      },
      error: (err: any) => {
        console.error('Error fetching hotels:', err);
        this.snackBar.open('Failed to fetch hotel data. Please try again later.', 'Close', {
          duration: 3000,
        });
      }
    });
  }
}
