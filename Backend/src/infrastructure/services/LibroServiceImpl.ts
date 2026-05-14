import { Transaction } from "sequelize";
import { LibroService } from "../../domain/services/LibroService";
import { Libro } from "../models/LibroModels";
import { Categoria } from "../models/CategoriaModels";
import { Autor } from "../models/AutorModels";

export class LibroServiceImpl implements LibroService {
    async createLibro(
        libro: Libro,
        tx?: Transaction
    ): Promise<Libro> {
        return await Libro.create({
            titulo: libro.titulo,
            descripcion: libro.descripcion,
            isbn: libro.isbn,
            id_categoria: libro.id_categoria,
            anio_publicacion: libro.anio_publicacion,
            disponibles: libro.disponibles
        },
        { transaction: tx }
        ).then(createdLibro => {
            console.log("Libro creado exitosamente");
            return createdLibro;
        })
        .catch(error => { throw new Error(`Error al crear libro: ${error}`) })
        .finally(() => { console.log("createLibro finalizado") });
    }

    async getLibroById(id: number, tx?: Transaction): Promise<Libro | null> {
        return await Libro.findByPk(id, {
            include: [
                { model: Categoria, as: 'categoria' },
                { model: Autor, as: 'autores' }
            ],
            transaction: tx
        })
            .then(libro => libro || null)
            .catch(error => { throw new Error(`Error al obtener libro: ${error}`) })
            .finally(() => { console.log("getLibroById finalizado") });
    }

    async getLibroByIsbn(isbn: string, tx?: Transaction): Promise<Libro | null> {
        return await Libro.findOne({
            where: { isbn },
            include: [
                { model: Categoria, as: 'categoria' },
                { model: Autor, as: 'autores' }
            ],
            transaction: tx
        })
            .then(libro => libro || null)
            .catch(error => { throw new Error(`Error al obtener libro por ISBN: ${error}`) })
            .finally(() => { console.log("getLibroByIsbn finalizado") });
    }

    async getAllLibros(tx?: Transaction): Promise<Libro[]> {
        return await Libro.findAll({
            include: [
                { model: Categoria, as: 'categoria' },
                { model: Autor, as: 'autores' }
            ],
            transaction: tx
        })
            .then(libros => libros)
            .catch(error => { throw new Error(`Error al obtener libros: ${error}`) })
            .finally(() => { console.log("getAllLibros finalizado") });
    }

    async getLibrosByCategoria(id_categoria: number, tx?: Transaction): Promise<Libro[]> {
        return await Libro.findAll({
            where: { id_categoria },
            include: [
                { model: Categoria, as: 'categoria' },
                { model: Autor, as: 'autores' }
            ],
            transaction: tx
        })
            .then(libros => libros)
            .catch(error => { throw new Error(`Error al obtener libros por categoría: ${error}`) })
            .finally(() => { console.log("getLibrosByCategoria finalizado") });
    }

    async updateLibro(
        libro: Libro,
        tx?: Transaction
    ): Promise<Libro | null> {
        return await Libro.update({
            titulo: libro.titulo,
            descripcion: libro.descripcion,
            isbn: libro.isbn,
            id_categoria: libro.id_categoria,
            anio_publicacion: libro.anio_publicacion,
            disponibles: libro.disponibles
        },
        { where: { id: libro.id }, transaction: tx }
        ).then(async () => {
            const libroActualizado = await Libro.findByPk(libro.id, {
                include: [
                    { model: Categoria, as: 'categoria' },
                    { model: Autor, as: 'autores' }
                ],
                transaction: tx
            });
            console.log("Libro actualizado exitosamente");
            return libroActualizado;
        })
        .catch(error => { throw new Error(`Error al actualizar libro: ${error}`) })
        .finally(() => { console.log("updateLibro finalizado") });
    }

    async deleteLibro(id: number, tx?: Transaction): Promise<boolean> {
        return await Libro.destroy({
            where: { id },
            transaction: tx
        })
            .then(resultado => resultado > 0)
            .catch(error => { throw new Error(`Error al eliminar libro: ${error}`) })
            .finally(() => { console.log("deleteLibro finalizado") });
    }
}
