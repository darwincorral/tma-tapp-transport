import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
declare var google: any;

@Component({
  selector: 'app-register-travel',
  templateUrl: './register-travel.component.html',
  styleUrls: ['./register-travel.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterTravelComponent  implements OnInit {
  selectedMina: string;
  selectedMaterial: string;
  cantidad: number;
  destino: string;
  autocompleteResults: any[] = [];
  map: any;
  ubicacionSelected:string = '';
  latitud: number;
  longitud: number;
  marker: any;

  minas: { nombre: string, latitud: number, longitud: number }[] = [
    { nombre: 'Mina A', latitud: -0.9962972, longitud: -77.8136035 },
    { nombre: 'Mina B', latitud: -1.0372957, longitud: -77.7969234 },
    // Añade las coordenadas para cada mina disponible
  ];
  
  constructor() { }

  ngOnInit() {}

  enviarDatos(form: NgForm) {
    if (form.valid) {
      console.log('Datos del envío:', this.selectedMina, this.selectedMaterial, this.cantidad, this.destino);
      // Aquí puedes realizar acciones con los datos, como enviarlos a través de una API, etc.
      // Por ahora, solo se muestra en consola para propósitos de demostración.
    } else {
      console.log('Por favor, completa el formulario correctamente.');
    }
  }

  buscarUbicacion(event) {
    const search = event.target.value;

    if (search  && search.trim().length > 3) { 
      // Llama a la función para buscar lugares y mostrar resultados de autocompletado
    this.buscarLugares(search)
    .then((predictions: any) => {
      this.autocompleteResults = predictions;
    })
    .catch((error) => {
      console.error(error);
    });
    } else {
      this.autocompleteResults = [];
      this.ubicacionSelected = '';
    }
   
  }

  buscarLugares(search: string) {
    return new Promise((resolve, reject) => {
      const service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions({ input: search }, (predictions) => {
        resolve(predictions);
      }, (error) => {
        reject(error);
      });
    });
  }

  seleccionarUbicacion(place) {
    this.destino = place.description;
    this.autocompleteResults = [];
    this.ubicacionSelected = place.description; 
    // Obtenemos las coordenadas de la mina seleccionada
    const minaSeleccionada = this.minas.find(mina => mina.nombre === this.selectedMina);

    if (minaSeleccionada) {
      // Mostramos la ubicación de la mina en el mapa como punto de inicio
      this.mostrarMarcadores(minaSeleccionada.latitud, minaSeleccionada.longitud, place.description);
    } else {
      console.error('No se encontraron coordenadas para la mina seleccionada.');
    }
  }


  mostrarMarcadores(latitudMina: any, longitudMina: any, ubicacion: string) {
    const geocoder = new google.maps.Geocoder();
    const minaLocation = new google.maps.LatLng(latitudMina, longitudMina);
  
    geocoder.geocode({ address: ubicacion }, (results, status) => {
      if (status === 'OK' && results[0] && results[0].geometry) {
        const destinationLocation = results[0].geometry.location;
  
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(minaLocation);
        bounds.extend(destinationLocation);
  
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: bounds.getCenter(),
          zoom: 15,
          streetViewControl: false,
          mapTypeControl: false,
          zoomControl: false,
          fullscreenControl: false,
        });
  
        const minaMarker = new google.maps.Marker({
          position: minaLocation,
          label: 'A',
          map: this.map,
        });
  
        const destinationMarker = new google.maps.Marker({
          position: destinationLocation,
          label: 'B',
          map: this.map,
        });
  
        this.map.fitBounds(bounds);
      }
    });
  }
}
