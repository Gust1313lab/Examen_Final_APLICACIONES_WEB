import { Request, Response } from "express";
import { LibroServiceImpl } from "../../infrastructure/services/LibroServiceImpl";
import { Libro } from "../../infrastructure/models/LibroModels";
import { Reserva } from "../../infrastructure/models/ReservaModels";

const libroService = new LibroServiceImpl();

export class LibroController {
    async createLibro(req: Request, res: Response) {
        console.log("request:", req.body);
        const { titulo, descripcion, isbn, id_categoria, anio_publicacion, disponibles } = req.body;
        try {
            if (!titulo || !isbn || !id_categoria) {
                return res.status(400).json({ message: "Título, ISBN e ID Categoría son requeridos" });
            }
            const libro = new Libro();
            libro.titulo = titulo;
            libro.descripcion = descripcion;
            libro.isbn = isbn;
            libro.id_categoria = id_categoria;
            libro.anio_publicacion = anio_publicacion;
            libro.disponibles = disponibles || 0;
            const createdLibro = await libroService.createLibro(libro);
            res.status(201).json(createdLibro);
        } catch (error: any) {
            console.error("Error creating libro:", error);
            if (error.message.includes("ya existe")) {
                return res.status(409).json({ message: error.message });
            }
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getLibroById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const libro = await libroService.getLibroById(Number(id));
            if (!libro) {
                return res.status(404).json({ message: "Libro no encontrado" });
            }
            res.status(200).json(libro);
        } catch (error) {
            console.error("Error fetching libro:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getAllLibros(req: Request, res: Response) {
        try {
            const libros = await libroService.getAllLibros();
            res.status(200).json(libros);
        } catch (error) {
            console.error("Error fetching libros:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getLibrosByCategoria(req: Request, res: Response) {
        const { id_categoria } = req.params;
        try {
            const libros = await libroService.getLibrosByCategoria(Number(id_categoria));
            res.status(200).json(libros);
        } catch (error) {
            console.error("Error fetching libros por categoría:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getLibrosDisponibles(req: Request, res: Response) {
        try {
            const libros = await libroService.getAllLibros();
            
            // Filtrar libros sin reserva activa
            const librosDisponibles = libros.filter(libro => libro.disponibles > 0);
            
            res.status(200).json(librosDisponibles);
        } catch (error) {
            console.error("Error fetching libros disponibles:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async updateLibro(req: Request, res: Response) {
        const { id } = req.params;
        const { titulo, descripcion, isbn, id_categoria, anio_publicacion, disponibles } = req.body;
        try {
            const existingLibro = await libroService.getLibroById(Number(id));
            if (!existingLibro) {
                return res.status(404).json({ message: "Libro no encontrado" });
            }
            existingLibro.titulo = titulo || existingLibro.titulo;
            existingLibro.descripcion = descripcion || existingLibro.descripcion;
            existingLibro.isbn = isbn || existingLibro.isbn;
            existingLibro.id_categoria = id_categoria || existingLibro.id_categoria;
            existingLibro.anio_publicacion = anio_publicacion || existingLibro.anio_publicacion;
            existingLibro.disponibles = disponibles !== undefined ? disponibles : existingLibro.disponibles;
            const updatedLibro = await libroService.updateLibro(existingLibro);
            res.status(200).json(updatedLibro);
        } catch (error) {
            console.error("Error updating libro:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async deleteLibro(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await libroService.deleteLibro(Number(id));
            if (result) {
                res.status(200).json({ message: "Libro eliminado exitosamente" });
            } else {
                res.status(404).json({ message: "Libro no encontrado" });
            }
        } catch (error) {
            console.error("Error deleting libro:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
