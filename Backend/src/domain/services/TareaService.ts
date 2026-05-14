import { Transaction } from 'sequelize';
import { EstadoTarea, Tarea } from '../../infrastructure/models/TareaModels';

export interface TareaService {
    createTarea(tarea: Tarea, tx?: Transaction): Promise<Tarea>;
    getTareaById(id: number, tx?: Transaction): Promise<Tarea | null>;
    getAllTareas(filters?: { estado?: EstadoTarea; id_proyecto?: number }, tx?: Transaction): Promise<Tarea[]>;
    updateTarea(tarea: Tarea, tx?: Transaction): Promise<Tarea | null>;
    updateEstadoTarea(id: number, estado: EstadoTarea, tx?: Transaction): Promise<Tarea | null>;
    deleteTarea(id: number, tx?: Transaction): Promise<boolean>;
}
