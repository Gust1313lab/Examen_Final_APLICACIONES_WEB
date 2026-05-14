import { Request, Response } from 'express';
import { ProyectoServiceImpl } from '../../infrastructure/services/ProyectoServiceImpl';
import { Proyecto } from '../../infrastructure/models/ProyectoModels';

const proyectoService = new ProyectoServiceImpl();

export class ProyectoController {
    async createProyecto(req: Request, res: Response) {
        try {
            const { nombre, descripcion, fecha_limite } = req.body;

            if (!nombre) {
                return res.status(400).json({ message: 'El nombre del proyecto es requerido' });
            }

            const proyecto = new Proyecto({
                nombre,
                descripcion,
                fecha_limite
            });

            const createdProyecto = await proyectoService.createProyecto(proyecto);
            return res.status(201).json(createdProyecto);
        } catch (error) {
            console.error('Error creating proyecto:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getProyectoById(req: Request, res: Response) {
        try {
            const proyecto = await proyectoService.getProyectoById(Number(req.params.id));

            if (!proyecto) {
                return res.status(404).json({ message: 'Proyecto no encontrado' });
            }

            return res.status(200).json(proyecto);
        } catch (error) {
            console.error('Error fetching proyecto:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getAllProyectos(_req: Request, res: Response) {
        try {
            const proyectos = await proyectoService.getAllProyectos();
            return res.status(200).json(proyectos);
        } catch (error) {
            console.error('Error fetching proyectos:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateProyecto(req: Request, res: Response) {
        try {
            const proyecto = await proyectoService.getProyectoById(Number(req.params.id));

            if (!proyecto) {
                return res.status(404).json({ message: 'Proyecto no encontrado' });
            }

            const { nombre, descripcion, fecha_limite } = req.body;
            proyecto.nombre = nombre ?? proyecto.nombre;
            proyecto.descripcion = descripcion ?? proyecto.descripcion;
            proyecto.fecha_limite = fecha_limite ?? proyecto.fecha_limite;

            const updatedProyecto = await proyectoService.updateProyecto(proyecto);
            return res.status(200).json(updatedProyecto);
        } catch (error) {
            console.error('Error updating proyecto:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteProyecto(req: Request, res: Response) {
        try {
            const deleted = await proyectoService.deleteProyecto(Number(req.params.id));

            if (!deleted) {
                return res.status(404).json({ message: 'Proyecto no encontrado' });
            }

            return res.status(200).json({ message: 'Proyecto eliminado exitosamente' });
        } catch (error) {
            console.error('Error deleting proyecto:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
