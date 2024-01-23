import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterCarComponent } from './register-car/register-car.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RegisterCarComponent]
})
export class CarsComponent  implements OnInit {

  cars: any[] = [
    { id: 1, name: 'PBA0822', type: 'Camión', capacity: '10000 Tn', avatarUrl: 'assets/user1.jpg' },
    { id: 2, name: 'IBD6481', type: 'Volqueta', capacity: '10000 Tn', avatarUrl: 'assets/user2.jpg' },
    // Agrega más usuarios según sea necesario.
  ];
  filteredCars: any[] = [];
  searchTerm: string = '';


  constructor() { 
    this.filteredCars= [...this.cars]; // Copia de seguridad de la lista de usuarios inicial.
  }

  ngOnInit() {}

  searchUsers() {
    this.filteredCars = this.cars.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openUserRegistration() {
    // Abre la pantalla de registro de usuarios, implementa esta función según tus necesidades.
  }

  viewUserDetails(userId: number) {
    // Abre la pantalla de detalles del usuario según el ID proporcionado, implementa esta función según tus necesidades.
  }

  reset(event) {

  }

}
