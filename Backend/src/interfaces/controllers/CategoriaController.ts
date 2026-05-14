import { Request, Response } from "express";
import { CategoriaServiceImpl } from "../../infrastructure/services/CategoriaServiceImpl";
import { Categoria } from "../../infrastructure/models/CategoriaModels";

const categoriaService = new CategoriaServiceImpl();

export class CategoriaController {
    async createCategoria(req: Request, res: Response) {
        console.log("request:", req.body);
        const { nombre, descripcion } = req.body;
        try {
            if (!nombre) {
                return res.status(400).json({ message: "El nombre es requerido" });
            }
            const categoria = new Categoria();
            categoria.nombre = nombre;
            categoria.descripcion = descripcion;
            const createdCategoria = await categoriaService.createCategoria(categoria);
            res.status(201).json(createdCategoria);
        } catch (error: any) {
            console.error("Error creating categoría:", error);
            if (error.message.includes("ya existe")) {
                return res.status(409).json({ message: error.message });
            }
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getCategoriaById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const categoria = await categoriaService.getCategoriaById(Number(id));
            if (!categoria) {
                return res.status(404).json({ message: "Categoría no encontrada" });
            }
            res.status(200).json(categoria);
        } catch (error) {
            console.error("Error fetching categoría:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getAllCategorias(req: Request, res: Response) {
        try {
            const categorias = await categoriaService.getAllCategorias();
            res.status(200).json(categorias);
        } catch (error) {
            console.error("Error fetching categorías:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async updateCategoria(req: Request, res: Response) {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        try {
            const existingCategoria = await categoriaService.getCategoriaById(Number(id));
            if (!existingCategoria) {
                return res.status(404).json({ message: "Categoría no encontrada" });
            }
            existingCategoria.nombre = nombre || existingCategoria.nombre;
            existingCategoria.descripcion = descripcion || existingCategoria.descripcion;
            const updatedCategoria = await categoriaService.updateCategoria(existingCategoria);
            res.status(200).json(updatedCategoria);
        } catch (error) {
            console.error("Error updating categoría:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async deleteCategoria(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await categoriaService.deleteCategoria(Number(id));
            if (result) {
                res.status(200).json({ message: "Categoría eliminada exitosamente" });
            } else {
                res.status(404).json({ message: "Categoría no encontrada" });
            }
        } catch (error) {
            console.error("Error deleting categoría:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
