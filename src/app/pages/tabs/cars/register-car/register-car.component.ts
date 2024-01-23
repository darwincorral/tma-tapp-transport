import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.component.html',
  styleUrls: ['./register-car.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterCarComponent  implements OnInit {
  selectedType: string = 'Cédula';
  placa: string = '';
  capacity: string = '';
  filePreview;
  fileExtension;
  file = null;

  constructor() { }

  ngOnInit() {}


  onSubmit(form: NgForm) {
    console.log(form.value);
   
  }

  handleFileInput(input: any) {
    const archivo = input.files[0];
    const allowedFileTypes = ['.jpg', '.jpeg', '.png'];
    this.fileExtension = archivo.name.toLowerCase().substring(archivo.name.lastIndexOf('.'));
  
    if (!allowedFileTypes.includes(this.fileExtension)) {
     // this.uiService.alertToastErrorMessage("Solo se permiten archivos de imagen y PDF.");
      return;
    }
  
    if(this.file && this.file['file'].name==archivo.name){
    //  this.uiService.alertToastErrorMessage("La imagen ya fue seleccionada, intente nuevamente");
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload = (e: any) => {
      this.filePreview= reader.result;

      //this.subirAdjunto();
    };
  
    reader.onerror = function (error) {};
  
  }

}
