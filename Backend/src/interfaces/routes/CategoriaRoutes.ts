import { Router } from 'express';
import { CategoriaController } from '../controllers/CategoriaController';

const controller = new CategoriaController();
export const Categoriasrouter = Router();

Categoriasrouter.post('/categorias', (req, res) => controller.createCategoria(req, res));
Categoriasrouter.get('/categorias/:id', (req, res) => controller.getCategoriaById(req, res));
Categoriasrouter.get('/categorias', (req, res) => controller.getAllCategorias(req, res));
Categoriasrouter.put('/categorias/:id', (req, res) => controller.updateCategoria(req, res));
Categoriasrouter.delete('/categorias/:id', (req, res) => controller.deleteCategoria(req, res));

export default Categoriasrouter;
