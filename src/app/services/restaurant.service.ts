import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the Restaurant interface
export interface Restaurant {
  idRestaurant: number;
  nom: string;
  description: string;
  adresse: string;
  ville: string;
  typeCuisine: string;
  nbEtoiles: number;
  prixMoyen: number;
  imageURL?: string;
}

@Injectable({
  providedIn: 'root'  // Makes the service available globally
})
export class RestaurantService {
  private apiUrl = 'http://localhost/api/get-restaurants.php';  // Update with your API endpoint

  constructor(private http: HttpClient) {}

  // Method to fetch the list of restaurants
  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiUrl);
  }
}
