import { Component, OnInit } from '@angular/core';
import { HotelService, Hotel } from '../../services/hotel.service';
import { RestaurantService, Restaurant } from '../../services/restaurant.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class DashboardComponent implements OnInit {
  hotels: Hotel[] = [];
  restaurants: Restaurant[] = [];
  
  // Form properties
  hotelForm!: FormGroup;
  restaurantForm!: FormGroup;
  
  // Modal display flags
  showHotelModal = false;
  showRestaurantModal = false;
  
  // Edit mode flag
  editMode = false;
  currentHotelId = 0;
  currentRestaurantId = 0;

  constructor(
    private hotelService: HotelService,
    private restaurantService: RestaurantService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadHotels();
    this.loadRestaurants();
    this.initForms();
  }

  // Initialize the forms
  initForms(): void {
    this.hotelForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      nbEtoiles: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      prixParNuit: [0, [Validators.required, Validators.min(0)]]
    });

    this.restaurantForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      typeCuisine: ['', Validators.required],
      nbEtoiles: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      prixMoyen: [0, [Validators.required, Validators.min(0)]]
    });
  }

  // Load all hotels
  loadHotels(): void {
    this.hotelService.getHotels().subscribe(data => {
      this.hotels = data;
    });
  }

  // Load all restaurants
  loadRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(data => {
      this.restaurants = data;
    });
  }

  // Open hotel modal for adding
  openAddHotelModal(): void {
    this.editMode = false;
    this.hotelForm.reset({
      nbEtoiles: 1,
      prixParNuit: 0
    });
    this.showHotelModal = true;
  }

  // Open hotel modal for editing
  openEditHotelModal(hotel: Hotel): void {
    this.editMode = true;
    this.currentHotelId = hotel.idHotel;
    this.hotelForm.setValue({
      nom: hotel.nom,
      description: hotel.description,
      adresse: hotel.adresse,
      ville: hotel.ville,
      nbEtoiles: hotel.nbEtoiles,
      prixParNuit: hotel.prixParNuit
    });
    this.showHotelModal = true;
  }

  // Close hotel modal
  closeHotelModal(): void {
    this.showHotelModal = false;
  }

  // Submit hotel form
  submitHotelForm(): void {
    if (this.hotelForm.invalid) {
      return;
    }

    const hotelData = this.hotelForm.value;
    
    if (this.editMode) {
      // Update existing hotel
      const updatedHotel: Hotel = {
        idHotel: this.currentHotelId,
        ...hotelData
      };
      
      this.hotelService.updateHotel(updatedHotel).subscribe({
        next: () => {
          this.loadHotels();
          this.closeHotelModal();
        },
        error: (err) => {
          console.error('Error updating hotel:', err);
        }
      });
    } else {
      // Add new hotel
      const newHotel: Hotel = {
        idHotel: 0,
        ...hotelData
      };
      
      this.hotelService.addHotel(newHotel).subscribe({
        next: (response) => {
          this.hotels.push(response);
          this.closeHotelModal();
        },
        error: (err) => {
          console.error('Error adding hotel:', err);
        }
      });
    }
  }

  // Open restaurant modal for adding
  openAddRestaurantModal(): void {
    this.editMode = false;
    this.restaurantForm.reset({
      nbEtoiles: 1,
      prixMoyen: 0
    });
    this.showRestaurantModal = true;
  }

  // Open restaurant modal for editing
  openEditRestaurantModal(restaurant: Restaurant): void {
    this.editMode = true;
    this.currentRestaurantId = restaurant.idRestaurant;
    this.restaurantForm.setValue({
      nom: restaurant.nom,
      description: restaurant.description,
      adresse: restaurant.adresse,
      ville: restaurant.ville,
      typeCuisine: restaurant.typeCuisine,
      nbEtoiles: restaurant.nbEtoiles,
      prixMoyen: restaurant.prixMoyen
    });
    this.showRestaurantModal = true;
  }

  // Close restaurant modal
  closeRestaurantModal(): void {
    this.showRestaurantModal = false;
  }

  // Submit restaurant form
  submitRestaurantForm(): void {
    if (this.restaurantForm.invalid) {
      return;
    }

    const restaurantData = this.restaurantForm.value;
    
    if (this.editMode) {
      // Update existing restaurant
      const updatedRestaurant: Restaurant = {
        idRestaurant: this.currentRestaurantId,
        ...restaurantData
      };
      
      this.restaurantService.updateRestaurant(updatedRestaurant).subscribe({
        next: () => {
          this.loadRestaurants();
          this.closeRestaurantModal();
        },
        error: (err) => {
          console.error('Error updating restaurant:', err);
        }
      });
    } else {
      // Add new restaurant
      const newRestaurant: Restaurant = {
        idRestaurant: 0,
        ...restaurantData
      };
      
      this.restaurantService.addRestaurant(newRestaurant).subscribe({
        next: (response) => {
          this.restaurants.push(response);
          this.closeRestaurantModal();
        },
        error: (err) => {
          console.error('Error adding restaurant:', err);
        }
      });
    }
  }

  // Delete an existing hotel
  deleteHotel(id: number): void {
    if (confirm('Are you sure you want to delete this hotel?')) {
      this.hotelService.deleteHotel(id).subscribe(() => {
        this.loadHotels();
      });
    }
  }

  // Delete an existing restaurant
  deleteRestaurant(id: number): void {
    if (confirm('Are you sure you want to delete this restaurant?')) {
      this.restaurantService.deleteRestaurant(id).subscribe(() => {
        this.loadRestaurants();
      });
    }
  }
}