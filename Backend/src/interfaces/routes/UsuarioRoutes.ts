import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';

const controller = new UsuarioController();
export const Usuariosrouter = Router();

Usuariosrouter.post('/usuarios', (req, res) => controller.createUsuario(req, res));
Usuariosrouter.get('/usuarios/:id', (req, res) => controller.getUsuarioById(req, res));
Usuariosrouter.get('/usuarios/email/:email', (req, res) => controller.getUsuarioByEmail(req, res));
Usuariosrouter.get('/usuarios', (req, res) => controller.getAllUsuarios(req, res));
Usuariosrouter.put('/usuarios/:id', (req, res) => controller.updateUsuario(req, res));
Usuariosrouter.delete('/usuarios/:id', (req, res) => controller.deleteUsuario(req, res));

export default Usuariosrouter;
