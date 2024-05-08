import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

  private myAppUrl: string;
  private myApiUrl: string;


    private userIdSubject = new BehaviorSubject<number | null>(null);
    public userId$ = this.userIdSubject.asObservable();

    private loggedIn = new BehaviorSubject<boolean>(false);

    private userId: number | null = null;

    constructor(private http: HttpClient) {
      this.myAppUrl = environment.endpoint; 
      this.myApiUrl = 'auth/';  
        const savedUserId = localStorage.getItem('userId');
        this.userId = savedUserId ? parseInt(savedUserId, 10) : null;
    
        this.checkAuthStatus().subscribe({
          next: (isAuthenticated) => {
            this.loggedIn.next(isAuthenticated);
          },
          error: () => this.loggedIn.next(false)
        });
    }

        public get isLoggedIn$(): Observable<boolean> {
            return this.loggedIn.asObservable();
        }
      

      

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}/login`, { email, password }, { withCredentials: true }).pipe(
            tap((response) => {
                this.userId = response.data.user.id_user; 
                this.loggedIn.next(true);
              }),
          catchError(this.handleError)
        );
      }

    register(userDetails: User): Observable<any> {
        return this.http.post(`${this.myAppUrl}${this.myApiUrl}/register`, userDetails).pipe(
            catchError(this.handleError)
        );
    }

    logout(): Observable<any> {
        return this.http.get(`${this.myAppUrl}${this.myApiUrl}/logout`, { withCredentials: true }).pipe(
          tap(() => {
            this.loggedIn.next(false);
            this.userId = null;
          }),
          catchError(this.handleError)
        );
      }

      getUserId(): number | null {
        return this.userId;
        }


checkAuthStatus(): Observable<boolean> {
  return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/auth-status`, { withCredentials: true }).pipe(
    tap((response) => {
      if (response.isAuthenticated && response.userId) {
        this.userId = response.userId;
        localStorage.setItem('userId', this.userId.toString());

       
        this.userIdSubject.next(this.userId);
        this.loggedIn.next(true);
      } else {
        this.loggedIn.next(false);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      this.loggedIn.next(false);
      return of(false);
    })
  );
}
  

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'Alguna cosa ha salido mal. Por favor, inténtalo de nuevo más tarde.';
        if (error.error instanceof ErrorEvent) {
        
            errorMessage = `Error: ${error.error.message}`;
        } else {
            if (error.error && typeof error.error === 'object' && error.error.message) {
                errorMessage = error.error.message;
            }
        }
        return throwError(() => new Error(errorMessage));
    }

    public isAuthenticated(): boolean {
        return this.loggedIn.value;
      }
}
