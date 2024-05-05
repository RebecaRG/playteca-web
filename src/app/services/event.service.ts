import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Event } from '../interfaces/event';

@Injectable({ providedIn: 'root' })
export class EventService {
  private myAppUrl: string;
  private myApiUrl: string;

  private eventsSubject = new BehaviorSubject<Event[]>([]);
  public events$ = this.eventsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'eventos/';
    this.loadInitialEvents();
  }

  private loadInitialEvents(): void {
    this.getEvents().subscribe(events => this.eventsSubject.next(events));
  }

  private getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
}
