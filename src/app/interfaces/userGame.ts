import { Product } from './product';
import { UserProfile } from './userProfile';

export interface UserGame {
    id_user_juegos: number;
    user_id: number;
    juego_id: number;
    estado: 'poseido' | 'deseado' | 'jugado';
    valoracion_juego?: number;
    fecha_introduccion?: Date;
    comentario: string;
    juego: Product;
    usuario: UserProfile;
}