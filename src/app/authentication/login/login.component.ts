import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router, public route: ActivatedRoute) {}

  showAlert: boolean = false;
  alertMessage: string = "";
  loading: boolean = false;
  loginform = true;
  // recoverform = false;

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  loginForm = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{3,}$/)])
  });

  loginUser() {
    const { email, password } = this.loginForm.value;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    if (typeof email === 'string' && typeof password === 'string') {
      this.authService.login(email, password).subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
          this.loading = false;
        },
        error: (error) => {
          this.showAlert = true;
          this.alertMessage = `Error durante el inicio de sesión: ${error.message}`;
          this.loading = false;
        }
      });
    }
  }
  

  closeAlert() {
    this.showAlert = false;
  }
}


  // showRecoverForm() {
  //    this.loginform = !this.loginform;
  //    this.recoverform = !this.recoverform;
//   //  }
// }
