// src/app/services/menu.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MenuItem {
  idMenu: number;
  nomPlat: string;
  description: string;
  prix: number;
  imageURL?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'http://localhost/api/get-menu.php';

  constructor(private http: HttpClient) {}

  getMenuByRestaurantId(restaurantId: number): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}?restaurantId=${restaurantId}`);
  }
}
