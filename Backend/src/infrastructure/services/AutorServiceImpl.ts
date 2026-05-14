import { Transaction } from "sequelize";
import { AutorService } from "../../domain/services/AutorService";
import { Autor } from "../models/AutorModels";

export class AutorServiceImpl implements AutorService {
    async createAutor(
        autor: Autor,
        tx?: Transaction
    ): Promise<Autor> {
        return await Autor.create({
            nombre: autor.nombre,
            biografia: autor.biografia,
            fecha_nacimiento: autor.fecha_nacimiento
        },
        { transaction: tx }
        ).then(createdAutor => {
            console.log("Autor creado exitosamente");
            return createdAutor;
        })
        .catch(error => { throw new Error(`Error al crear autor: ${error}`) })
        .finally(() => { console.log("createAutor finalizado") });
    }

    async getAutorById(id: number, tx?: Transaction): Promise<Autor | null> {
        return await Autor.findByPk(id, { transaction: tx })
            .then(autor => autor || null)
            .catch(error => { throw new Error(`Error al obtener autor: ${error}`) })
            .finally(() => { console.log("getAutorById finalizado") });
    }

    async getAllAutores(tx?: Transaction): Promise<Autor[]> {
        return await Autor.findAll({ transaction: tx })
            .then(autores => autores)
            .catch(error => { throw new Error(`Error al obtener autores: ${error}`) })
            .finally(() => { console.log("getAllAutores finalizado") });
    }

    async updateAutor(
        autor: Autor,
        tx?: Transaction
    ): Promise<Autor | null> {
        return await Autor.update({
            nombre: autor.nombre,
            biografia: autor.biografia,
            fecha_nacimiento: autor.fecha_nacimiento
        },
        { where: { id: autor.id }, transaction: tx }
        ).then(async () => {
            const autorActualizado = await Autor.findByPk(autor.id, { transaction: tx });
            console.log("Autor actualizado exitosamente");
            return autorActualizado;
        })
        .catch(error => { throw new Error(`Error al actualizar autor: ${error}`) })
        .finally(() => { console.log("updateAutor finalizado") });
    }

    async deleteAutor(id: number, tx?: Transaction): Promise<boolean> {
        return await Autor.destroy({
            where: { id },
            transaction: tx
        })
            .then(resultado => resultado > 0)
            .catch(error => { throw new Error(`Error al eliminar autor: ${error}`) })
            .finally(() => { console.log("deleteAutor finalizado") });
    }
}
