import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserBoardService } from '../../services/user-board.service';
import { UserGame } from '../../interfaces/userGame';

@Component({
  selector: 'app-edit-user-game-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-user-game-modal.component.html',
  styleUrl: './edit-user-game-modal.component.scss'
})
export class EditUserGameModalComponent implements OnInit {
  @Input() userGame: UserGame;

  constructor(
    public activeModal: NgbActiveModal,
    private userBoardService: UserBoardService
  ) {}

  userGameForm = new FormGroup({
    'juego': new FormControl({ value: '', disabled: true }),
    'estado': new FormControl('', [Validators.required]),
    'puntuacion': new FormControl(0, [Validators.min(0), Validators.max(5)]), 
    'comentario': new FormControl('', [Validators.maxLength(300)])
  });

  ngOnInit(): void {
    this.userGameForm.patchValue({
      juego: this.userGame.juego.titulo, 
      estado: this.userGame.estado,
      puntuacion: this.userGame.valoracion_juego,
      comentario: this.userGame.comentario
    });
  }


  saveChanges(): void {
    if (this.userGameForm.valid) {
      const updatedGame = {
        estado: this.userGameForm.value.estado,
        valoracion_juego: this.userGameForm.value.puntuacion || 0,
        comentario: this.userGameForm.value.comentario || ''
      };

  
      this.userBoardService.updateUserJuego(this.userGame.id_user_juegos, updatedGame).subscribe({
        next: () => {
          console.log('Juego actualizado con éxito');
          this.activeModal.close(); 
        },
        error: (error) => console.error('Error al actualizar el juego:', error)
      });
    } else {
      console.warn('Formulario inválido');
    }
  }
}