import { Router } from 'express';
import { LibroController } from '../controllers/LibroController';

const controller = new LibroController();
export const Librosrouter = Router();

Librosrouter.post('/libros', (req, res) => controller.createLibro(req, res));
Librosrouter.get('/libros/disponibles', (req, res) => controller.getLibrosDisponibles(req, res));
Librosrouter.get('/libros/categoria/:id_categoria', (req, res) => controller.getLibrosByCategoria(req, res));
Librosrouter.get('/libros/:id', (req, res) => controller.getLibroById(req, res));
Librosrouter.get('/libros', (req, res) => controller.getAllLibros(req, res));
Librosrouter.put('/libros/:id', (req, res) => controller.updateLibro(req, res));
Librosrouter.delete('/libros/:id', (req, res) => controller.deleteLibro(req, res));

export default Librosrouter;
