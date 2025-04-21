// src/app/components/rest-list/rest-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService, Restaurant } from '../../services/restaurant.service';
import { MenuService, MenuItem } from '../../services/menu.service';

@Component({
  selector: 'app-rest-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rest-list.component.html',
  styleUrls: ['./rest-list.component.css']
})
export class RestListComponent implements OnInit {
  restaurants: Restaurant[] = [];
  menus: { [restaurantId: number]: MenuItem[] } = {};
  expandedRestaurantId: number | null = null;

  constructor(
    private restaurantService: RestaurantService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe({
      next: (data) => this.restaurants = data,
      error: (err) => console.error('Error fetching restaurants:', err)
    });
  }

  toggleMenu(restaurantId: number): void {
    if (this.expandedRestaurantId === restaurantId) {
      this.expandedRestaurantId = null;
      return;
    }

    this.expandedRestaurantId = restaurantId;

    if (!this.menus[restaurantId]) {
      this.menuService.getMenuByRestaurantId(restaurantId).subscribe({
        next: (data) => this.menus[restaurantId] = data,
        error: (err) => console.error('Error fetching menu:', err)
      });
    }
  }
}
