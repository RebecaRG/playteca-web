import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../interfaces/user';
// import { checkPrime } from 'crypto';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseUrl = 'http://localhost:3000/auth';

    private loggedIn = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {
        this.checkAuthStatus().subscribe({
            next: (isAuthenticated) => this.loggedIn.next(isAuthenticated),
            error: () => this.loggedIn.next(false)
        });
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/login`, { email, password }, { withCredentials: true }).pipe(
            catchError(this.handleError),
            tap(() => this.loggedIn.next(true))
        );
    }

    register(userDetails: User): Observable<any> {
        return this.http.post(`${this.baseUrl}/register`, userDetails).pipe(
            catchError(this.handleError)
        );
    }

    logout(): Observable<any> {
        return this.http.get(`${this.baseUrl}/logout`, { withCredentials: true }).pipe(
            catchError(this.handleError),
            tap(() => this.loggedIn.next(false))
        );
    }


    checkAuthStatus(): Observable<boolean> {
        return this.http.get<boolean>(`${this.baseUrl}/auth-status`, { withCredentials: true }).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error('Error al verificar el estado de autenticación:', error.message);
                return of(false);
            })
        );
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'Alguna cosa ha salido mal. Por favor, inténtalo de nuevo más tarde.';
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            if (error.error && typeof error.error === 'object' && error.error.message) {
                // Extract the message from the error object
                errorMessage = error.error.message;
            }
        }
        return throwError(() => new Error(errorMessage));
    }
}
