import { Transaction } from 'sequelize';
import { Proyecto } from '../../infrastructure/models/ProyectoModels';

export interface ProyectoService {
    createProyecto(proyecto: Proyecto, tx?: Transaction): Promise<Proyecto>;
    getProyectoById(id: number, tx?: Transaction): Promise<Proyecto | null>;
    getAllProyectos(tx?: Transaction): Promise<Proyecto[]>;
    updateProyecto(proyecto: Proyecto, tx?: Transaction): Promise<Proyecto | null>;
    deleteProyecto(id: number, tx?: Transaction): Promise<boolean>;
}
