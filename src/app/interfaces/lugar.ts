export interface LugarTipo{
    id: number,
    nombre: string
}


export interface Lugar {
    id_lugares?: number;
    lugares_tipo: LugarTipo; 
    nombre: string;
    latitud: number;
    longitud: number;
    direccion: string;
    estado: number;
}