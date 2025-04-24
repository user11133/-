import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

interface Hotel {
  idHotel: number;
  nom: string;
  description: string;
  adresse: string;
  ville: string;
  nbEtoiles: number;
  prixParNuit: number;
  imageURL: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class DashboardComponent implements OnInit {
  hotels: Hotel[] = [];
  isLoading = true;
  errorMessage = '';
  successMessage = '';

  modalType: 'add' | 'edit' = 'add';
  modalData: Hotel = {
    idHotel: 0,
    nom: '',
    description: '',
    adresse: '',
    ville: '',
    nbEtoiles: 3,
    prixParNuit: 0,
    imageURL: ''
  };

  // Modal visibility flag (for Angular control)
  showModal: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadHotels();
  }

  async loadHotels(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    
    try {
      const response = await lastValueFrom(
        this.http.get<Hotel[]>('http://localhost/api/get-hotels.php')
      );
      this.hotels = response;
    } catch (error) {
      console.error('Failed to load hotels:', error);
      this.errorMessage = 'Failed to load hotels. Please try again later.';
    } finally {
      this.isLoading = false;
    }
  }

  openModal(type: 'add' | 'edit', hotel?: Hotel): void {
    this.modalType = type;
    this.errorMessage = '';
    
    if (type === 'edit' && hotel) {
      // For editing, set the modal data to the selected hotel
      this.modalData = { ...hotel };
    } else {
      // For adding, reset the modal data
      this.modalData = {
        idHotel: 0,
        nom: '',
        description: '',
        adresse: '',
        ville: '',
        nbEtoiles: 3,
        prixParNuit: 0,
        imageURL: ''
      };
    }

    // Show modal by setting flag to true
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  async saveHotel(): Promise<void> {
    try {
      if (this.modalType === 'add') {
        // Add new hotel
        const response = await lastValueFrom(
          this.http.post<Hotel>('http://localhost/api/add-hotel.php', this.modalData)
        );
        this.hotels.push(response);
        this.successMessage = 'Hotel added successfully!';
      } else {
        // Update existing hotel
        await lastValueFrom(
          this.http.post('http://localhost/api/update-hotel.php', this.modalData)
        );
        const index = this.hotels.findIndex(h => h.idHotel === this.modalData.idHotel);
        if (index !== -1) {
          this.hotels[index] = { ...this.modalData };
        }
        this.successMessage = 'Hotel updated successfully!';
      }

      // Close modal after saving
      this.closeModal();
    } catch (error: any) {
      console.error('Failed to save hotel:', error);
      this.errorMessage = error.error?.message || 'Failed to save hotel. Please try again.';
    }
  }

  async deleteHotel(id: number): Promise<void> {
    if (confirm('Are you sure you want to delete this hotel?')) {
      try {
        const response = await lastValueFrom(
          this.http.post<{success: boolean, message: string}>( 
            'http://localhost/api/delete-hotel.php', 
            { idHotel: id }
          )
        );
        
        if (response.success) {
          this.hotels = this.hotels.filter(hotel => hotel.idHotel !== id);
          this.successMessage = response.message;
        } else {
          this.errorMessage = response.message;
        }
      } catch (error: any) {
        console.error('Failed to delete hotel:', error);
        this.errorMessage = error.error?.message || 'Failed to delete hotel. Please try again.';
      }
    }
  }
}
