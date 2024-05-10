import { Injectable } from '@angular/core';
import { InfoPlayteca } from '../interfaces/infoPlayteca';

@Injectable({
  providedIn: 'root'
})
export class InfoPlaytecaService {

  public infoCard: InfoPlayteca[] = [
    {
      id: 1,
      titulo: '¿Qué es Playteca?',
      descripcion: '<p>Playteca es un sitio web que surge de la afición por los juegos de mesa. Puedes encontrar información detallada sobre productos, ubicaciones especializadas y fechas de eventos que no te puedes perder. </p><p>Además, podrás <span class="fw-bold">crear un perfil</span> y hacer una lista con los juegos de mesa de tu colección y aquellos que deseas comprar.</p>',
      icono: 'fa fa-play-circle',
      color: 'primary',
    },
    {
      id: 2,
      titulo: 'Listado de juegos',
      descripcion: '<p>Consulta la tabla para ver todos los juegos de mesa que tenemos registrados. Realiza búsquedas y aplica filtros para encontrar todo lo que necesites.</p> <p>También, puedes acceder a información detallada de cada juego.</p>',
      icono: 'fa fa-table',
      color: 'success',
    },
    {
      id: 3,
      titulo: 'Mapa',
      descripcion: '<p>En el mapa puedes visualizar diferentes ubicaciones: asociaciones de aficionados a los juegos de mesa, bares donde te prestarán un juego mientras disfrutas de una bebida, bibliotecas con préstamos de juegos de mesa, y una selección de las mejores tiendas especializadas.</p><p>Actualmente, hay ubicaciones en Barcelona, y próximamente las habrá en otras localidades.</p>',
      icono: 'fa fa-map',
      color: 'warning',
    },
    {
      id: 4,
      titulo: 'Calendario',
      descripcion: "<p>Encuentra tu próxima cita con los juegos de mesa. Filtra por semanas, meses o días, o, si lo prefieres, consulta la agenda semanal.</p> <p> Si haces clic en el evento, encontrarás información detallada sobre la dirección, la fecha de inicio y fin, y más información complementaria.</p>",
      icono: 'fa fa-calendar',
      color: 'info',
    },
    
  ];

  constructor() { }

  getInfoCard(): InfoPlayteca[] {
    return this.infoCard;
  }
}
