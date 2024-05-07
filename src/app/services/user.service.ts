import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../interfaces/userProfile';


@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly apiUrl = 'http://localhost:3000/user';

    constructor(private http: HttpClient) { }


    getUserProfile(userId: number): Observable<any> {
        return this.http.get<UserProfile>(`${this.apiUrl}/${userId}`);
    }
}
