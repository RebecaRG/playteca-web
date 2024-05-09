import { Component, OnInit, Input } from '@angular/core';
import { UserBoardService } from '../../services/user-board.service';
import { UserGame } from '../../interfaces/userGame';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { RouterLink } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-tablon-usuario',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbRatingModule, ReactiveFormsModule],
  templateUrl: './tablon-usuario.component.html',
  styleUrl: './tablon-usuario.component.scss'
})
export class TablonUsuarioComponent implements OnInit {
  userId: number | null = null;
  poseidos: any[] = [];
  deseados: any[] = [];
  allGames: any[] = [];
  constructor(private userBoardService: UserBoardService, private authService: AuthService, private productService: ProductService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

  

    this.productService.getProducts().subscribe({
      next: (data) => this.allGames = data.productos,
      error: (error) => console.error('Error al obtener los juegos:', error)
    });

    if (this.userId !== null) {
      this.userBoardService.getJuegosByUser(this.userId).subscribe({
        next: (data) => {
          this.poseidos = data.filter((juego: UserGame) => juego.estado === 'poseido');
          this.deseados = data.filter((juego: UserGame) => juego.estado === 'deseado');
        },
      });
    }
}

get juego() {
  return this.userGameForm.get('juego') as FormControl;
}

get estado() {
  return this.userGameForm.get('estado') as FormControl;
}

get puntuacion() {
  return this.userGameForm.get('puntuacion') as FormControl;
}

get comentario() {
  return this.userGameForm.get('comentario') as FormControl;
}

userGameForm = new FormGroup({
  'juego': new FormControl('', [Validators.required]),
  'estado': new FormControl('', [Validators.required]),
  'puntuacion': new FormControl('', [Validators.min(0), Validators.max(5)]),
  'comentario': new FormControl('')
});

addGame(): void {
  if (this.userGameForm.valid && this.userId !== null) {
  
    const nuevoJuego = {
      user_id: this.userId,
      juego_id: this.userGameForm.value.juego,
      estado: this.userGameForm.value.estado,
      valoracion_juego: this.userGameForm.value.puntuacion || 0,
      comentario: this.userGameForm.value.comentario || ''
    };

    
    this.userBoardService.addJuegoToUser(nuevoJuego).subscribe({
      next: () => {
        console.log('Nuevo juego añadido con éxito');
        this.ngOnInit(); 
      },
      error: (error) => console.error('Error al agregar el nuevo juego:', error)
    });
  } else {
    console.warn('Formulario inválido o sin usuario');
  }
}
}
