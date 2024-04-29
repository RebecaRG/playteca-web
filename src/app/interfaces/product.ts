export interface Complejidad {
    id: number;
    nombre: string;
}

export interface Contexto {
    id: number;
    nombre: string;
}

export interface Tematizacion {
    id: number;
    nombre: string;
}

export interface Dinamica {
    id: number;
    nombre: string;
}

export interface Parte {
    id: number;
    nombre: string;
}

export interface Componente {
    id: number;
    nombre: string;
}

export interface Product {
    id_juego?: number;
    complejidad_id?: Complejidad;
    contexto_id?: Contexto;
    tematizacion_id?: Tematizacion;
    dinamica_id?: Dinamica;
    parte_id?: Parte
    ruta_imagen?: Componente[];
    titulo: string;
    descripcion?: string;
    fecha_publicacion?: Date;
    editorial: string;
    autoria: string;
    ilustracion?: string;
    participantes_min: number;
    participantes_max: number;
    duracion_minutos: number;
    edad_min: number;
    ean?: string;
    url?: string;
    medidas_caja_cm?: string;
    peso_gr?: number;
    premios?: string;
    ranking_global?: number;
}

export interface ResponseProducts {
    mensaje: string;
    cantidad: number;
    productos: Product[];
}
