import { Router } from 'express';
import { TareaController } from '../controllers/TareaController';

const controller = new TareaController();
export const TareasRouter = Router();

TareasRouter.post('/tareas', (req, res) => controller.createTarea(req, res));
TareasRouter.get('/tareas/:id', (req, res) => controller.getTareaById(req, res));
TareasRouter.get('/tareas', (req, res) => controller.getAllTareas(req, res));
TareasRouter.put('/tareas/:id', (req, res) => controller.updateTarea(req, res));
TareasRouter.patch('/tareas/:id/estado', (req, res) => controller.updateEstadoTarea(req, res));
TareasRouter.delete('/tareas/:id', (req, res) => controller.deleteTarea(req, res));
