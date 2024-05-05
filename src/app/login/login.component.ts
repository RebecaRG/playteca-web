import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  providers: [AuthService],
})
export class LoginComponent {
  msg = '';
  
  constructor(private authService: AuthService, private router: Router) {}

  check(email: string, password: string): void {
    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.router.navigate(['/starter']); 
      },
      error: (error) => {
        this.msg = 'Invalid Username or Password';
      }
    });
  }
}
