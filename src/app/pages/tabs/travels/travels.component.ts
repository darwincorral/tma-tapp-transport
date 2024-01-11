import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { EmptyScreenComponent } from 'src/app/components/empty-screen/empty-screen.component';
import { DetailTravelComponent } from './detail-travel/detail-travel.component';
import { RegisterTravelComponent } from './register-travel/register-travel.component';
@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, EmptyScreenComponent, DetailTravelComponent, RegisterTravelComponent]
})
export class TravelsComponent  implements OnInit {
  entregas: any[] = [
    {
      puntoInicial: 'Mina A',
      puntoFinal: 'Planta de Procesamiento X',
      materialEnviado: 'Oro',
      transporte: 'Volqueta 1',
    },
    {
      puntoInicial: 'Mina B',
      puntoFinal: 'Planta de Procesamiento Y',
      materialEnviado: 'Plata',
      transporte: 'Volqueta 2',
    },
    // Agrega más entregas según tus datos
  ];
  searchTerm: string = '';
  filteredTravels: any[] = [];
  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  searchTravels() {
    this.filteredTravels = this.entregas.filter(entrega =>
      entrega.puntoInicial.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  async openDetail(){
    const modal = await this.modalCtrl.create({
      component: DetailTravelComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      //this.message = `Hello, ${data}!`;
    }
  }

  reset(event) {

  }


}
