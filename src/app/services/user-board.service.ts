import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserGame } from '../interfaces/userGame';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserBoardService {
    private myAppUrl: string;
    private myApiUrl: string;

    constructor(private http: HttpClient) {
        this.myAppUrl = environment.endpoint; 
        this.myApiUrl = 'user/';  
    }

    getJuegosByUser(userId: number): Observable<any> {
      return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}${userId}/juegos`, { withCredentials: true });
    }
  
    
    addJuegoToUser(juegoData: any): Observable<any> {
      return this.http.post<any>(`${this.myAppUrl}/${this.myApiUrl}`, juegoData);
    }
  
    updateUserJuego(juegoId: number, juegoData: any): Observable<any> {
      return this.http.put<any>(`${this.myAppUrl}/${this.myApiUrl}/juegos/${juegoId}`, juegoData);
    }
  
    deleteUserJuego(juegoId: number): Observable<any> {
      return this.http.delete<any>(`${this.myAppUrl}/${this.myApiUrl}/juegos/${juegoId}`);
    }
}