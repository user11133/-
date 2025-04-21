import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
//import { AllproductsComponent } from './allproducts/allproducts.component';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { RestListComponent } from './components/rest-list/rest-list.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
    { path : '' , component : AccueilComponent },
    { path: 'hotel-list', component: HotelListComponent },
    {path : 'rest-list', component : RestListComponent},
    {path : 'register', component: RegisterComponent},
    {path : 'login', component:LoginComponent}
    
    
];
