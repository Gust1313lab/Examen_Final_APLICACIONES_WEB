import { Router } from 'express';
import { ReservaController } from '../controllers/ReservaController';

const controller = new ReservaController();
export const Reservasrouter = Router();

Reservasrouter.post('/reservas', (req, res) => controller.createReserva(req, res));
Reservasrouter.get('/reservas/:id', (req, res) => controller.getReservaById(req, res));
Reservasrouter.get('/reservas/usuario/:id_usuario', (req, res) => controller.getReservasByUsuario(req, res));
Reservasrouter.get('/reservas/libro/:id_libro', (req, res) => controller.getReservasByLibro(req, res));
Reservasrouter.get('/reservas', (req, res) => controller.getAllReservas(req, res));
Reservasrouter.put('/reservas/cancelar/:id', (req, res) => controller.cancelarReserva(req, res));
Reservasrouter.put('/reservas/devolver/:id', (req, res) => controller.devolverLibro(req, res));
Reservasrouter.put('/reservas/:id', (req, res) => controller.updateReserva(req, res));
Reservasrouter.delete('/reservas/:id', (req, res) => controller.deleteReserva(req, res));

export default Reservasrouter;
