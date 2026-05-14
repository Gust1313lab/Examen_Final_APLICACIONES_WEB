import { CategoriaDTO } from './categoria.interface';
import { AutorDTO } from './autor.interface';

export interface LibroDTO {
    id?: number;
    titulo: string;
    descripcion?: string;
    isbn: string;
    id_categoria: number;
    anio_publicacion?: number;
    disponibles: number;
    categoria?: CategoriaDTO;
    autores?: AutorDTO[];
}
