import { Component, Input } from '@angular/core';
import { Event } from '../../interfaces/event';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-calendario',
  standalone: true,
  imports: [],
  templateUrl: './modal-calendario.component.html',
  styleUrl: './modal-calendario.component.scss'
})
export class ModalCalendarioComponent {
  @Input() event!: Event;
  @Input() modalRef: NgbActiveModal;

  close() {
    this.modalRef.dismiss('Cross click');
  }

  formatDate(date: string | Date): string {
    const newDate = new Date(date);
    const formattedDate = `${newDate.getDate().toString().padStart(2, '0')}/${(newDate.getMonth() + 1).toString().padStart(2, '0')}/${newDate.getFullYear()} a las ${newDate.getHours().toString().padStart(2, '0')}:${newDate.getMinutes().toString().padStart(2, '0')}h`;
    return formattedDate;
  }

}
