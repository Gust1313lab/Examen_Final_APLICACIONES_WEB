import { Transaction } from 'sequelize';
import { ProyectoService } from '../../domain/services/ProyectoService';
import { Proyecto } from '../models/ProyectoModels';

export class ProyectoServiceImpl implements ProyectoService {
    async createProyecto(proyecto: Proyecto, tx?: Transaction): Promise<Proyecto> {
        return Proyecto.create(
            {
                nombre: proyecto.nombre,
                descripcion: proyecto.descripcion,
                fecha_limite: proyecto.fecha_limite
            },
            { transaction: tx }
        );
    }

    async getProyectoById(id: number, tx?: Transaction): Promise<Proyecto | null> {
        return Proyecto.findByPk(id, {
            include: ['tareas'],
            transaction: tx
        });
    }

    async getAllProyectos(tx?: Transaction): Promise<Proyecto[]> {
        return Proyecto.findAll({
            include: ['tareas'],
            order: [['id', 'ASC']],
            transaction: tx
        });
    }

    async updateProyecto(proyecto: Proyecto, tx?: Transaction): Promise<Proyecto | null> {
        await Proyecto.update(
            {
                nombre: proyecto.nombre,
                descripcion: proyecto.descripcion,
                fecha_limite: proyecto.fecha_limite
            },
            {
                where: { id: proyecto.id },
                transaction: tx
            }
        );

        return this.getProyectoById(proyecto.id, tx);
    }

    async deleteProyecto(id: number, tx?: Transaction): Promise<boolean> {
        const deletedRows = await Proyecto.destroy({
            where: { id },
            transaction: tx
        });

        return deletedRows > 0;
    }
}
