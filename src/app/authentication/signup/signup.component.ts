import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  showError: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  get username(){
    return this.registerForm.get('username') as FormControl;
  }

  get name(){
    return this.registerForm.get('name') as FormControl;
  }

  get surname(){
    return this.registerForm.get('surname') as FormControl;
  }

  get email(){
    return this.registerForm.get('email') as FormControl;
  }

  get password(){
    return this.registerForm.get('password') as FormControl;
  }

  get confirmPassword(){
    return this.registerForm.get('confirmPassword') as FormControl;
  }

  registerForm = new FormGroup({
    'username': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]{3,}$/)]),
    'name': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]{3,}$/)]),
    'surname': new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z ]{3,}$/)]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{5,}$/)]),
    'confirmPassword': new FormControl('', [Validators.required])
  }, {
    validators: passwordMatchValidator
  });

closeAlert() {
  this.showError = false;
}

submitDetails() {
  const postData = { ...this.registerForm.value };
  delete postData.confirmPassword;



  this.authService.register(postData as User).subscribe({
    next: (response) => {
  
      this.setTokenCookie(response.accessToken);

      this.authService.login(postData.email!, postData.password!).subscribe({
        next: (loginResponse) => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
      });
    },
    error: (error) => {
      this.showError = true;
      this.errorMessage = error.message || 'Error desconocido durante el registro.';
  }
  });
}


setTokenCookie(token: string) {

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7); // Por ejemplo, expira en 7 días


  const expirationDateString = expirationDate.toUTCString();


  document.cookie = `token=${token}; expires=${expirationDateString}; path=/;`;
}

}
