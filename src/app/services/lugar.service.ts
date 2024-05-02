import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Lugar, LugarTipo } from '../interfaces/lugar';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LugarService {
        private myAppUrl: string;
        private myApiUrl: string;
    
        constructor(private http: HttpClient) {
            this.myAppUrl = environment.endpoint;  
            this.myApiUrl = 'lugares'; 
        }

        getLugaresConTipo(): Observable<Lugar[]> {
            return this.http.get<Lugar[]>(`${this.myAppUrl}${this.myApiUrl}?include[]=tipo`);
        }

        getTiposDeLugares(): Observable<any> {
          return this.http.get<LugarTipo[]>(`${this.myAppUrl}${this.myApiUrl}/tipos`);
      }
}