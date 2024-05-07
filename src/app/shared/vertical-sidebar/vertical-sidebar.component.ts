import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouteInfo } from './vertical-sidebar.metadata';
import { VerticalSidebarService } from './vertical-sidebar.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { AuthService } from 'src/app/services/auth.service';


declare var $: any;

@Component({
  selector: 'app-vertical-sidebar',
  standalone: true,
  imports:[TranslateModule, CommonModule, RouterModule, FeatherModule],
  templateUrl: './vertical-sidebar.component.html'
})
export class VerticalSidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: RouteInfo[] = [];
  path = '';
  isLoggedIn = false;


  @Input() showClass: boolean = false;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();


  handleNotify() {
    this.notify.emit(!this.showClass);
  }

  constructor(private menuServise: VerticalSidebarService, private router: Router, private authService: AuthService) {
    this.menuServise.items.subscribe(menuItems => {
      this.sidebarnavItems = menuItems;

      // Active menu 
      this.sidebarnavItems.filter(m => m.submenu.filter(
        (s) => {
          if (s.path === this.router.url) {
            this.path = m.title;
          }
        }
      ));
      this.addExpandClass(this.path);
    });
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
    });
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
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

}
