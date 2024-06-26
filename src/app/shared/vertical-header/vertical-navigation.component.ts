import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, EventEmitter, Output, OnInit } from '@angular/core';
import {
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
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
            this.router.navigate(['/playteca']);
        },
    });
}

  ngAfterViewInit() {}
}
