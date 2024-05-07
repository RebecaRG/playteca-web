import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, EventEmitter, Output, OnInit } from '@angular/core';
import {
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
// import { TranslateService } from '@ngx-translate/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';





@Component({
  selector: 'app-vertical-navigation',
  standalone: true,
  imports: [CommonModule, NgScrollbarModule, RouterLink, NgbDropdownModule],
  templateUrl: './vertical-navigation.component.html',
})
export class VerticalNavigationComponent implements AfterViewInit, OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  isLoggedIn = false;


  constructor(
    private modalService: NgbModal,
    // private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
    });
  }
  

  logoutUser() {
    this.authService.logout().subscribe({
        next: () => {
            console.log('Sesión cerrada correctamente');
            this.router.navigate(['/auth/login']);
        },
        error: (error) => {
            console.error('Error al cerrar la sesión:', error.message);
        }
    });
}

  ngAfterViewInit() {}
}
