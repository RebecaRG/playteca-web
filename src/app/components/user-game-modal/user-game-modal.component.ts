import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserBoardService } from '../../services/user-board.service';

@Component({
  selector: 'app-user-game-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-game-modal.component.html',
  styleUrl: './user-game-modal.component.scss'
})
export class UserGameModalComponent {
  @Input() allGames: any[] = [];
  @Input() userId: number | null = null;

  // Estructura del formulario en el modal
  userGameForm = new FormGroup({
    'juego': new FormControl('', [Validators.required]),
    'estado': new FormControl('', [Validators.required]),
    'puntuacion': new FormControl('', [Validators.min(0), Validators.max(5)]),
    'comentario': new FormControl('', [Validators.maxLength(200)])
  });

  constructor(
    public activeModal: NgbActiveModal,
    private userBoardService: UserBoardService
  ) {}


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
          this.activeModal.close();
        },
        error: (error) => console.error('Error al agregar el nuevo juego:', error)
      });
    } else {
      console.warn('Formulario inválido o sin usuario');
    }
  }
}
