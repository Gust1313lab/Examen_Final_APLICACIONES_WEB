import { Router } from 'express';
import { ProyectoController } from '../controllers/ProyectoController';
const controller = new ProyectoController();
export const ProyectosRouter = Router();
ProyectosRouter.post('/proyectos', (req, res) => controller.createProyecto(req, res));
ProyectosRouter.get('/proyectos/:id', (req, res) => controller.getProyectoById(req, res));
ProyectosRouter.get('/proyectos', (req, res) => controller.getAllProyectos(req, res));
ProyectosRouter.put('/proyectos/:id', (req, res) => controller.updateProyecto(req, res));
ProyectosRouter.delete('/proyectos/:id', (req, res) => controller.deleteProyecto(req, res));
