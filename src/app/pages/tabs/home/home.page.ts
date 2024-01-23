import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EmptyScreenComponent } from 'src/app/components/empty-screen/empty-screen.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, EmptyScreenComponent]
})
export class HomePage implements OnInit {

  categories: any[] = [];
  entregas: any[] = [];
 
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.categories = [
      {id: 1, cover: 'assets/menu/cars.jpg', name: 'Vehículos', tab:'cars'},
      {id: 8, cover: 'assets/menu/viajes.png', name: 'Viajes', tab:'travels'},
    ];

    this.entregas = [
      {
        puntoInicial: 'Mina A',
        puntoFinal: 'Planta de Procesamiento X',
        materialEnviado: 'Oro 10 Toneladas',
      },
      {
        puntoInicial: 'Mina B',
        puntoFinal: 'Planta de Procesamiento Y',
        materialEnviado: 'Plata 5 Toneladas',
      },
      {
        puntoInicial: 'Mina A',
        puntoFinal: 'Planta de Procesamiento Y',
        materialEnviado: 'Plata 5 Toneladas',
      },
      {
        puntoInicial: 'Mina B',
        puntoFinal: 'Planta de Procesamiento Y',
        materialEnviado: 'Plata 5 Toneladas',
      },
      // Agrega más entregas según tus datos
    ];
  }

  toGoTab(tab){
    this.router.navigateByUrl('/tabs/'+tab, {replaceUrl: true});
  }

  
}