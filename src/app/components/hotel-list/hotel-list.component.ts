import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelService, Hotel } from './../../services/hotel.service'; // adjust if path differs
import { MatSnackBar } from '@angular/material/snack-bar'; // import MatSnackBar

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[] = [];

  constructor(
    private hotelService: HotelService, // Hotel service to fetch data
    private snackBar: MatSnackBar // Inject MatSnackBar for showing notifications
  ) {}

  ngOnInit(): void {
    this.hotelService.getHotels().subscribe({
      next: (data) => {
        this.hotels = data;
      },
      error: (err) => {
        // Show an error message in a snackbar on error
        console.error('Error fetching hotels:', err);
        this.snackBar.open('Failed to fetch hotel data. Please try again later.', 'Close', {
          duration: 3000, // Automatically close after 3 seconds
        });
      }
    });
  }
}
