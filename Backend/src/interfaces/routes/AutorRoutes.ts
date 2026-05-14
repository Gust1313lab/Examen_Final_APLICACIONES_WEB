import { Router } from 'express';
import { AutorController } from '../controllers/AutorController';

const controller = new AutorController();
export const Autoresrouter = Router();

Autoresrouter.post('/autores', (req, res) => controller.createAutor(req, res));
Autoresrouter.get('/autores/:id', (req, res) => controller.getAutorById(req, res));
Autoresrouter.get('/autores', (req, res) => controller.getAllAutores(req, res));
Autoresrouter.put('/autores/:id', (req, res) => controller.updateAutor(req, res));
Autoresrouter.delete('/autores/:id', (req, res) => controller.deleteAutor(req, res));

export default Autoresrouter;
