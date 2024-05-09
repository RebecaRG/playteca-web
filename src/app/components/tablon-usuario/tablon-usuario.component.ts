import { Component, OnInit } from '@angular/core';
import { UserBoardService } from '../../services/user-board.service';
import { AuthService } from 'src/app/services/auth.service';
import { RouterLink } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserGameModalComponent } from '../user-game-modal/user-game-modal.component';
import { UserGame } from '../../interfaces/userGame';
import { ProductService } from 'src/app/services/product.service';
import { CommonModule } from '@angular/common';
import { EditUserGameModalComponent } from '../edit-user-game-modal/edit-user-game-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-tablon-usuario',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbRatingModule],
  templateUrl: './tablon-usuario.component.html',
  styleUrl: './tablon-usuario.component.scss'
})
export class TablonUsuarioComponent implements OnInit {
  userId: number | null = null;
  poseidos: any[] = [];
  deseados: any[] = [];
  allGames: any[] = [];

  constructor(
    private userBoardService: UserBoardService,
    private authService: AuthService,
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {

    this.userId = this.authService.getUserId();

    this.productService.getProducts().subscribe({
      next: (data) => this.allGames = data.productos,
      error: (error) => console.error('Error al obtener los juegos:', error)
    });

    this.loadUserGames();
  }

  
  loadUserGames() {
    if (this.userId !== null) {
      this.userBoardService.getJuegosByUser(this.userId).subscribe({
        next: (data) => {
          this.poseidos = data.filter((juego: UserGame) => juego.estado === 'poseido');
          this.deseados = data.filter((juego: UserGame) => juego.estado === 'deseado');
        },
        error: (error) => console.error('Error al cargar los juegos del usuario:', error)
      });
    }
  }

 
  openAddGameModal() {
    const modalRef = this.modalService.open(UserGameModalComponent);
    modalRef.componentInstance.allGames = this.allGames;
    modalRef.componentInstance.userId = this.userId;

  
    modalRef.result.then(() => {
      this.loadUserGames();
    }, (reason) => {});
  }

  openEditGameModal(userGame: UserGame) {
    const modalRef = this.modalService.open(EditUserGameModalComponent);
    modalRef.componentInstance.userGame = userGame;
  
    modalRef.result.then(() => {
      this.loadUserGames();
    }, (reason) => {});
  }
  

  deleteUserGame(juegoId: number): void {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Eliminar Juego';
    modalRef.componentInstance.message = '¿Quieres eliminar este juego de la lista?';
  

    modalRef.result.then((result) => {
      if (result) {
        this.userBoardService.deleteUserJuego(juegoId).subscribe({
          next: () => {

            this.loadUserGames(); 
          },
          error: (error) => console.error('Error al eliminar el juego:', error)
        });
      }
    }, () => {});
  }
}
