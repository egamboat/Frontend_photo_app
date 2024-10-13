export interface Foto {
    id: number;
    titulo: string;
    foto_url: string;
    description: string;
    visibilidad: string;
    creacion: string; 
    modificacion: string;
    user: number;
}

export interface Comentario {
    id: number;
    user: string;
    texto_comentado: string;
    creacion: string;
    nombre_usuario: string;
  }