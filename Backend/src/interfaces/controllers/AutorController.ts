import { Request, Response } from "express";
import { AutorServiceImpl } from "../../infrastructure/services/AutorServiceImpl";
import { Autor } from "../../infrastructure/models/AutorModels";

const autorService = new AutorServiceImpl();

export class AutorController {
    async createAutor(req: Request, res: Response) {
        console.log("request:", req.body);
        const { nombre, biografia, fecha_nacimiento } = req.body;
        try {
            if (!nombre) {
                return res.status(400).json({ message: "El nombre es requerido" });
            }
            const autor = new Autor();
            autor.nombre = nombre;
            autor.biografia = biografia;
            autor.fecha_nacimiento = fecha_nacimiento;
            const createdAutor = await autorService.createAutor(autor);
            res.status(201).json(createdAutor);
        } catch (error: any) {
            console.error("Error creating autor:", error);
            if (error.message.includes("ya existe")) {
                return res.status(409).json({ message: error.message });
            }
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getAutorById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const autor = await autorService.getAutorById(Number(id));
            if (!autor) {
                return res.status(404).json({ message: "Autor no encontrado" });
            }
            res.status(200).json(autor);
        } catch (error) {
            console.error("Error fetching autor:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getAllAutores(req: Request, res: Response) {
        try {
            const autores = await autorService.getAllAutores();
            res.status(200).json(autores);
        } catch (error) {
            console.error("Error fetching autores:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async updateAutor(req: Request, res: Response) {
        const { id } = req.params;
        const { nombre, biografia, fecha_nacimiento } = req.body;
        try {
            const existingAutor = await autorService.getAutorById(Number(id));
            if (!existingAutor) {
                return res.status(404).json({ message: "Autor no encontrado" });
            }
            existingAutor.nombre = nombre || existingAutor.nombre;
            existingAutor.biografia = biografia || existingAutor.biografia;
            existingAutor.fecha_nacimiento = fecha_nacimiento || existingAutor.fecha_nacimiento;
            const updatedAutor = await autorService.updateAutor(existingAutor);
            res.status(200).json(updatedAutor);
        } catch (error) {
            console.error("Error updating autor:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async deleteAutor(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await autorService.deleteAutor(Number(id));
            if (result) {
                res.status(200).json({ message: "Autor eliminado exitosamente" });
            } else {
                res.status(404).json({ message: "Autor no encontrado" });
            }
        } catch (error) {
            console.error("Error deleting autor:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
