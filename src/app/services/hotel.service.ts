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

@Injectable({ providedIn: 'root' })
export class HotelService {
  private apiUrl = 'http://localhost/api/get-hotels.php';

  constructor(private http: HttpClient) {}

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.apiUrl);
  }
}
