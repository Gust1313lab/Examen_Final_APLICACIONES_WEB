import { Transaction, WhereOptions } from 'sequelize';
import { TareaService } from '../../domain/services/TareaService';
import { EstadoTarea, Tarea } from '../models/TareaModels';

export class TareaServiceImpl implements TareaService {
    async createTarea(tarea: Tarea, tx?: Transaction): Promise<Tarea> {
        return Tarea.create(
            {
                titulo: tarea.titulo,
                descripcion: tarea.descripcion,
                estado: tarea.estado,
                id_proyecto: tarea.id_proyecto,
                fecha_vencimiento: tarea.fecha_vencimiento
            },
            { transaction: tx }
        );
    }

    async getTareaById(id: number, tx?: Transaction): Promise<Tarea | null> {
        return Tarea.findByPk(id, {
            include: ['proyecto'],
            transaction: tx
        });
    }

    async getAllTareas(
        filters?: { estado?: EstadoTarea; id_proyecto?: number },
        tx?: Transaction
    ): Promise<Tarea[]> {
        const where: WhereOptions = {};

        if (filters?.estado) {
            where.estado = filters.estado;
        }

        if (filters?.id_proyecto) {
            where.id_proyecto = filters.id_proyecto;
        }

        return Tarea.findAll({
            where,
            include: ['proyecto'],
            order: [['id', 'ASC']],
            transaction: tx
        });
    }

    async updateTarea(tarea: Tarea, tx?: Transaction): Promise<Tarea | null> {
        await Tarea.update(
            {
                titulo: tarea.titulo,
                descripcion: tarea.descripcion,
                estado: tarea.estado,
                id_proyecto: tarea.id_proyecto,
                fecha_vencimiento: tarea.fecha_vencimiento
            },
            {
                where: { id: tarea.id },
                transaction: tx
            }
        );

        return this.getTareaById(tarea.id, tx);
    }

    async updateEstadoTarea(id: number, estado: EstadoTarea, tx?: Transaction): Promise<Tarea | null> {
        await Tarea.update(
            { estado },
            {
                where: { id },
                transaction: tx
            }
        );

        return this.getTareaById(id, tx);
    }

    async deleteTarea(id: number, tx?: Transaction): Promise<boolean> {
        const deletedRows = await Tarea.destroy({
            where: { id },
            transaction: tx
        });

        return deletedRows > 0;
    }
}
