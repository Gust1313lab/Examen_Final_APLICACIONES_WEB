import { Transaction } from "sequelize";
import { Categoria } from "../../infrastructure/models/CategoriaModels";

export interface CategoriaService {
    createCategoria(
        categoria: Categoria,
        tx?: Transaction
    ): Promise<Categoria>;

    getCategoriaById(
        id: number,
        tx?: Transaction
    ): Promise<Categoria | null>;

    getAllCategorias(
        tx?: Transaction
    ): Promise<Categoria[]>;

    updateCategoria(
        categoria: Categoria,
        tx?: Transaction
    ): Promise<Categoria | null>;

    deleteCategoria(
        id: number,
        tx?: Transaction
    ): Promise<boolean>;
}
