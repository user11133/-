import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Hotel {
  idHotel: number;
  nom: string;
  description: string;
  adresse: string;
  ville: string;
  nbEtoiles: number;
  prixParNuit: number;
  imageURL?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = 'http://localhost/api'; // Adjust to your PHP API root

  constructor(private http: HttpClient) {}

  // Get the list of hotels
  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.apiUrl}/get-hotels.php`);
  }

  // Add a new hotel
  addHotel(hotel: Hotel): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-hotel.php`, hotel);
  }

  // Update an existing hotel
  updateHotel(hotel: Hotel): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-hotel.php`, hotel);
  }

  // Delete a hotel
  deleteHotel(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/delete-hotel.php`, { idHotel: id });
  }
}
