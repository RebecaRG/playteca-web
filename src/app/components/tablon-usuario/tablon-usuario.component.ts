import { Component, OnInit, Input } from '@angular/core';
import { UserBoardService } from '../../services/user-board.service';
import { UserGame } from '../../interfaces/userGame';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tablon-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tablon-usuario.component.html',
  styleUrl: './tablon-usuario.component.scss'
})
export class TablonUsuarioComponent implements OnInit {
  userId: number | null = null;
  poseidos: any[] = [];
  deseados: any[] = [];

  constructor(private userBoardService: UserBoardService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    if (this.userId !== null) {
      this.userBoardService.getJuegosByUser(this.userId).subscribe({
        next: (data) => {
      
          this.poseidos = data.filter((juego: UserGame) => juego.estado === 'poseido');
          this.deseados = data.filter((juego: UserGame) => juego.estado === 'deseado');
        },
      });
    
  }
}
}
