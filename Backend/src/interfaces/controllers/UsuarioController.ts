import { Request, Response } from "express";
import { UsuarioServiceImpl } from "../../infrastructure/services/UsuarioServiceImpl";
import { Usuario } from "../../infrastructure/models/UsuarioModels";

const usuarioService = new UsuarioServiceImpl();

export class UsuarioController {
    async createUsuario(req: Request, res: Response) {
        console.log("request:", req.body);
        const { nombre, email, contraseña } = req.body;
        try {
            if (!nombre || !email || !contraseña) {
                return res.status(400).json({ message: "Nombre, email y contraseña son requeridos" });
            }
            const usuario = new Usuario();
            usuario.nombre = nombre;
            usuario.email = email;
            usuario.contraseña = contraseña;
            const createdUsuario = await usuarioService.createUsuario(usuario);
            res.status(201).json(createdUsuario);
        } catch (error: any) {
            console.error("Error creating usuario:", error);
            if (error.message.includes("ya existe")) {
                return res.status(409).json({ message: error.message });
            }
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getUsuarioById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const usuario = await usuarioService.getUsuarioById(Number(id));
            if (!usuario) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            res.status(200).json(usuario);
        } catch (error) {
            console.error("Error fetching usuario:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getUsuarioByEmail(req: Request, res: Response) {
        const { email } = req.params;
        try {
            const usuario = await usuarioService.getUsuarioByEmail(String(email));
            if (!usuario) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            res.status(200).json(usuario);
        } catch (error) {
            console.error("Error fetching usuario:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getAllUsuarios(req: Request, res: Response) {
        try {
            const usuarios = await usuarioService.getAllUsuarios();
            res.status(200).json(usuarios);
        } catch (error) {
            console.error("Error fetching usuarios:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async updateUsuario(req: Request, res: Response) {
        const { id } = req.params;
        const { nombre, email, contraseña } = req.body;
        try {
            const existingUsuario = await usuarioService.getUsuarioById(Number(id));
            if (!existingUsuario) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            existingUsuario.nombre = nombre || existingUsuario.nombre;
            existingUsuario.email = email || existingUsuario.email;
            existingUsuario.contraseña = contraseña || existingUsuario.contraseña;
            const updatedUsuario = await usuarioService.updateUsuario(existingUsuario);
            res.status(200).json(updatedUsuario);
        } catch (error) {
            console.error("Error updating usuario:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async deleteUsuario(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await usuarioService.deleteUsuario(Number(id));
            if (result) {
                res.status(200).json({ message: "Usuario eliminado exitosamente" });
            } else {
                res.status(404).json({ message: "Usuario no encontrado" });
            }
        } catch (error) {
            console.error("Error deleting usuario:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
