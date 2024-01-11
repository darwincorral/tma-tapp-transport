import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
declare var google: any;

@Component({
  selector: 'app-detail-travel',
  templateUrl: './detail-travel.component.html',
  styleUrls: ['./detail-travel.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetailTravelComponent  implements OnInit {

  entrega: any = {
    fecha: '2022-01-02',
    estado: 'Entregado',
    puntoEnvio: {
      fecha: '2022-01-02 14:00',
      mina: 'Mina 1 La Concepción',
      material: 'Arena 10 Toneladas',
    },
    puntoLlegada: {
      fecha: '2022-01-02 14:30',
      direccion: 'Av. Oriental y De los Sauces',
    },
    transporte: {
      vehiculo: 'PBA-0822',
      propietario: 'Pepe Piguage'
    }
  };


  constructor() { }

  ngOnInit() {}

  ionViewDidEnter() {
// Coordenadas de ejemplo del trayecto (ajusta esto según tus datos reales)
const coordenadasTrayecto = [
  { hora:'14:00',lat: -0.9962972000000001, lng: -77.81360350000001 }, // Punto de inicio
  {  hora:'14:14',lat: -1.0121879, lng: -77.80907959999999 },
  // Agrega las coordenadas intermedias del trayecto aquí
  {  hora:'14:30',lat: -1.0372957, lng: -77.7969234 }, // Punto de fin
];

this.mostrarTrayecto(coordenadasTrayecto);
  }

  estadoColor(estado) {
    switch (estado) {
      case 'Entregado':
        return 'success'; // Verde
      case 'Cancelado':
        return 'danger'; // Rojo
      case 'En Proceso':
        return 'primary'; // Azul
      default:
        return 'medium'; // Color predeterminado
    }
  }


  mostrarTrayecto(coordenadas) {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -1.0121879, lng: -77.80907959999999}, // Coordenadas iniciales del mapa
      zoom: 12, // Nivel de zoom
      streetViewControl: false, // Oculta el control de Street View
      mapTypeControl: false, // Oculta el control de Mapa/Satélite
      zoomControl: false, // Oculta el control de zoom
      fullscreenControl: false, // Oculta el control de pantalla completa
    });
  
    // Marcador punto de inicio
    new google.maps.Marker({
      position: coordenadas[0], // Coordenadas del punto de inicio
      map: map,
      icon: 'assets/icons/mina.png',
    });
  
    // Marcador punto de fin
    new google.maps.Marker({
      position: coordenadas[coordenadas.length - 1], // Coordenadas del punto final
      map: map,
      icon: 'assets/icons/bodega.png',
    });
  
    // Crear una ruta con las coordenadas
    const route = new google.maps.Polyline({
      path: coordenadas, // Coordenadas del trayecto
      geodesic: true,
      strokeColor: '#de0f17', // Color de la línea de la ruta
      strokeOpacity: 0.7, // Opacidad de la línea
      strokeWeight: 3, // Grosor de la línea
    });
  
  
    // Crear un array para almacenar las ventanas de información
    const infoWindows = [];
  
    // Recorres las coordenadas para crear los marcadores y las ventanas de información
    for (let i = 0; i < coordenadas.length; i++) {
      const coordenada = coordenadas[i];
  
      // Marcador con la coordenada actual
      const marker = new google.maps.Marker({
        position: coordenada,
        map: map,
        icon: 'assets/icons/punto.png',
        //label: (i === 0) ? 'Punto de Inicio' : 'Punto ' + i,
      });
  
      // Contenido de la ventana de información
      const contentString = `
        <div style='width:200px'>
          <p>Hora: ${coordenada.hora}</p>
          <p>Latitud: ${coordenada.lat}</p>
          <p>Longitud: ${coordenada.lng}</p>
        </div>
      `;
  
      // Ventana de información
      const infoWindow = new google.maps.InfoWindow({
        content: contentString,
      });
  
      // Agregar evento click para mostrar la ventana de información
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
  
      // Agregar la ventana de información al array
      infoWindows.push(infoWindow);
    }

    route.setMap(map);
  }
}
