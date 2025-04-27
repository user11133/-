import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost/api';

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/get-restaurants.php`);
  }

  addRestaurant(restaurant: Restaurant): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-rest.php`, restaurant);
  }

  updateRestaurant(restaurant: Restaurant): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-rest.php`, restaurant);
  }

  deleteRestaurant(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-rest.php?id=${id}`);
  }
}
