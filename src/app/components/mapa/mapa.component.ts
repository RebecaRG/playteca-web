import { Component, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { LugarService } from 'src/app/services/lugar.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss'
})

export class MapaComponent implements AfterViewInit {
    map!: mapboxgl.Map;
    selectedCategory: string = '';
    categorias: any[] = [];
    lugares: any[] = [];
  
    constructor(private _lugarService: LugarService, 
      ) { }
  
    ngAfterViewInit(): void {
      this.initializeMap();
      this.fetchCategoriasYLugares();
    }

private fetchCategoriasYLugares(): void {
  this._lugarService.getTiposDeLugares().subscribe({
    next: (categorias) => {
      this.categorias = categorias;
    },
  });

  this._lugarService.getLugaresConTipo().subscribe({
    next: (lugares) => {
      this.lugares = lugares;
      this.loadAllCategories();
    }
  });
}

private initializeMap(): void {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [2.1741251043945327, 41.41247674904886],
    zoom: 12,
    accessToken: environment.mapboxToken
  });

  this.map = map;

  this.map.on('load', () => {
    this.loadAllCategories();
  });
}

private loadCategoryData(category: string): void {
  this.clearMarkers();
  if (category === 'SELECCIONA CATEGORÍA') {
    this.loadAllCategories();
    return;
  }


  const filteredLocations = this.lugares.filter(l => {
    
    if (l.tipo && l.tipo.nombre) {
      return l.tipo.nombre.toLowerCase() === category.toLowerCase();
    }
    return false;
  });


  filteredLocations.forEach(location => {
    this.addMarker(location, location.tipo.nombre.toLowerCase());
  });
}

private loadAllCategories(): void {
  this.clearMarkers();
  this.lugares.forEach(location => {
    if (location.tipo && location.tipo.nombre) {
    this.addMarker(location, location.tipo.nombre.toLowerCase());
    }
  });
}

private addMarker(location: any, category: string): void {
  const popupContent = `
  <div>
    <div class="h5 text-dark"><strong>${location.nombre}</strong></div>
    <div class="text-body">${location.direccion}</div>
  </div>
  `;


  const categoryStyles: { [key: string]: { color: string, icon: string } } = {
    tiendas: { color: "#FF8A65", icon: "<i class='fas fa-shopping-cart'></i>" },
    bares: { color: "#64B5F6", icon: "<i class='fas fa-beer'></i>" },
    bibliotecas: { color: "#81C784", icon: "<i class='fas fa-book'></i>" },
    asociaciones: { color: "#BA68C8", icon: "<i class='fas fa-users'></i>" }
  };

  const el = document.createElement('div');
  el.className = 'marker';
  el.innerHTML = categoryStyles[category] ? categoryStyles[category].icon : "<i class='fas fa-map-marker-alt'></i>";
  el.style.backgroundColor = categoryStyles[category] ? categoryStyles[category].color : '#FFC107';
  el.style.color = "white";
  el.style.fontSize = "20px";
  el.style.textAlign = "center";
  el.style.width = '40px';
  el.style.height = '40px';
  el.style.lineHeight = '40px';
  el.style.borderRadius = '50%';

  const marker = new mapboxgl.Marker(el)
    .setLngLat([location.longitud, location.latitud])
    .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent))
    .addTo(this.map);
  this.markers.push(marker);
}

markers: mapboxgl.Marker[] = [];

clearMarkers(): void {
  this.markers.forEach(marker => marker.remove());
  this.markers = [];
}

filterMarkers(): void {
  
  if (this.selectedCategory === '') {
    this.loadAllCategories();
  } else {
    this.loadCategoryData(this.selectedCategory);
  }
}
  }