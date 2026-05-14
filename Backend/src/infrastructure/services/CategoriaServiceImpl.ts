import { Transaction } from "sequelize";
import { CategoriaService } from "../../domain/services/CategoriaService";
import { Categoria } from "../models/CategoriaModels";

export class CategoriaServiceImpl implements CategoriaService {
    async createCategoria(
        categoria: Categoria,
        tx?: Transaction
    ): Promise<Categoria> {
        return await Categoria.create({
            nombre: categoria.nombre,
            descripcion: categoria.descripcion
        },
        { transaction: tx }
        ).then(createdCategoria => {
            console.log("Categoría creada exitosamente");
            return createdCategoria;
        })
        .catch(error => { throw new Error(`Error al crear categoría: ${error}`) })
        .finally(() => { console.log("createCategoria finalizado") });
    }

    async getCategoriaById(id: number, tx?: Transaction): Promise<Categoria | null> {
        return await Categoria.findByPk(id, { transaction: tx })
            .then(categoria => categoria || null)
            .catch(error => { throw new Error(`Error al obtener categoría: ${error}`) })
            .finally(() => { console.log("getCategoriaById finalizado") });
    }

    async getAllCategorias(tx?: Transaction): Promise<Categoria[]> {
        return await Categoria.findAll({ transaction: tx })
            .then(categorias => categorias)
            .catch(error => { throw new Error(`Error al obtener categorías: ${error}`) })
            .finally(() => { console.log("getAllCategorias finalizado") });
    }

    async updateCategoria(
        categoria: Categoria,
        tx?: Transaction
    ): Promise<Categoria | null> {
        return await Categoria.update({
            nombre: categoria.nombre,
            descripcion: categoria.descripcion
        },
        { where: { id: categoria.id }, transaction: tx }
        ).then(async () => {
            const categoriaActualizada = await Categoria.findByPk(categoria.id, { transaction: tx });
            console.log("Categoría actualizada exitosamente");
            return categoriaActualizada;
        })
        .catch(error => { throw new Error(`Error al actualizar categoría: ${error}`) })
        .finally(() => { console.log("updateCategoria finalizado") });
    }

    async deleteCategoria(id: number, tx?: Transaction): Promise<boolean> {
        return await Categoria.destroy({
            where: { id },
            transaction: tx
        })
            .then(resultado => resultado > 0)
            .catch(error => { throw new Error(`Error al eliminar categoría: ${error}`) })
            .finally(() => { console.log("deleteCategoria finalizado") });
    }
}
