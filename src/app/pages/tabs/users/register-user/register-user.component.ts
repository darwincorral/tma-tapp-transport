import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterUserComponent  implements OnInit {
  selectedIdentificationType: string = 'Cédula';
  identification: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  selectedRole: string = 'Supervisor';
  constructor() { }

  ngOnInit() {}


  onSubmit(form: NgForm) {
    console.log(form.value);
   
  }


  validateCedula() {
    if (this.selectedIdentificationType === 'Cédula') {
      const cedula = this.identification.trim();
      if (cedula.length !== 10) {
        // La cédula debe tener 10 dígitos.
        // Puedes mostrar un mensaje de error o hacer lo que consideres apropiado.
      } else {
        // Validación de cédula ecuatoriana.
        const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        const total = coeficientes.reduce((acc, coef, index) => {
          const digit = parseInt(cedula[index], 10);
          const product = digit * coef;
          return acc + (product < 10 ? product : product - 9);
        }, 0);
        if (total % 10 === 0 || (total % 10 === 0 && cedula[9] === '0')) {
          // La cédula es válida.
          // Puedes mostrar un mensaje de éxito o hacer lo que consideres apropiado.
        } else {
          // La cédula es inválida.
          // Puedes mostrar un mensaje de error o hacer lo que consideres apropiado.
        }
      }
    }
  }
}
