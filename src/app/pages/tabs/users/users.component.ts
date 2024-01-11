import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EmptyScreenComponent } from 'src/app/components/empty-screen/empty-screen.component';
import { RegisterUserComponent } from './register-user/register-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, EmptyScreenComponent, RegisterUserComponent]
})
export class UsersComponent  implements OnInit {

  users: any[] = [
    { id: 1, name: 'Usuario 1', email: 'usuario1@example.com', role: 'Supervisor', avatarUrl: 'assets/user1.jpg' },
    { id: 2, name: 'Usuario 2', email: 'usuario2@example.com', role: 'Despachador', avatarUrl: 'assets/user2.jpg' },
    // Agrega más usuarios según sea necesario.
  ];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  
  constructor() { 
    this.filteredUsers = [...this.users]; // Copia de seguridad de la lista de usuarios inicial.
  }

  ngOnInit() {}

  searchUsers() {
    this.filteredUsers = this.users.filter(user =>
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
