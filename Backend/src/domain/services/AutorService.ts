import { Transaction } from "sequelize";
import { Autor } from "../../infrastructure/models/AutorModels";

export interface AutorService {
    createAutor(
        autor: Autor,
        tx?: Transaction
    ): Promise<Autor>;

    getAutorById(
        id: number,
        tx?: Transaction
    ): Promise<Autor | null>;

    getAllAutores(
        tx?: Transaction
    ): Promise<Autor[]>;

    updateAutor(
        autor: Autor,
        tx?: Transaction
    ): Promise<Autor | null>;

    deleteAutor(
        id: number,
        tx?: Transaction
    ): Promise<boolean>;
}
