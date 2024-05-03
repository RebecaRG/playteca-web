import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Subscription } from 'rxjs';
import { FullCalendarModule } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'; 
import listPlugin from '@fullcalendar/list'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCalendarioComponent } from '../modal-calendario/modal-calendario.component';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit, OnDestroy {
  calendarOptions: any;
  private eventsSubscription!: Subscription;

  constructor(private eventService: EventService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.initializeCalendarOptions();
    this.eventsSubscription = this.eventService.events$.subscribe(events => {
      this.calendarOptions.events = this.mapEventsToCalendar(events);
    });
  }

  private mapEventsToCalendar(events: any[]): any[] {
    return events.map(event => ({
      id: event.id,
      title: event.titulo,
      start: event.inicio,
      end: event.fin,
      extendedProps: {
        descripcion: event.descripcion,
        lugar: event.lugar,
      }
    }));
  }
  private initializeCalendarOptions() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      locale: esLocale,
      events: [],
      displayEventTime: false,
      eventClick: (info: any) => {
        this.modalWOpen(info.event);
    },
    eventTextColor: '#6352ca ', 
    eventBackgroundColor: '#FFFFFF',
    eventBorderColor: '#6352ca ',
    fixedWeekCount: false,
    height: 500,
    };
  }

  ngOnDestroy() {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }

  modalWOpen(event: any) {
    const modalRef = this.modalService.open(ModalCalendarioComponent);
  
    const eventForModal = {
      id: event.id,
      titulo: event.title,
      inicio: event.start,
      fin: event.end,
      ...event.extendedProps
    };
  
    modalRef.componentInstance.event = eventForModal;
    modalRef.componentInstance.modalRef = modalRef;
  }

  }


