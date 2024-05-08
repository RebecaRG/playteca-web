import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../interfaces/userProfile';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root',
})
export class UserService {
    private myAppUrl: string;
    private myApiUrl: string;

    constructor(private http: HttpClient) {
        this.myAppUrl = environment.endpoint; 
        this.myApiUrl = 'users/';  
    }


    getUserProfile(userId: number): Observable<any> {
        return this.http.get<UserProfile>(`${this.myAppUrl}${this.myApiUrl}/${userId}`, { withCredentials: true });
    }
}
