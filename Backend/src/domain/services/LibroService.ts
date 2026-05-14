import { Transaction } from "sequelize";
import { Libro } from "../../infrastructure/models/LibroModels";

export interface LibroService {
    createLibro(
        libro: Libro,
        tx?: Transaction
    ): Promise<Libro>;

    getLibroById(
        id: number,
        tx?: Transaction
    ): Promise<Libro | null>;

    getLibroByIsbn(
        isbn: string,
        tx?: Transaction
    ): Promise<Libro | null>;

    getAllLibros(
        tx?: Transaction
    ): Promise<Libro[]>;

    getLibrosByCategoria(
        id_categoria: number,
        tx?: Transaction
    ): Promise<Libro[]>;

    updateLibro(
        libro: Libro,
        tx?: Transaction
    ): Promise<Libro | null>;

    deleteLibro(
        id: number,
        tx?: Transaction
    ): Promise<boolean>;
}
