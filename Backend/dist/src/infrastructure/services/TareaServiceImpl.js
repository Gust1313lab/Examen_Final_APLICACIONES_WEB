import { Tarea } from '../models/TareaModels';
export class TareaServiceImpl {
    async createTarea(tarea, tx) {
        return Tarea.create({
            titulo: tarea.titulo,
            descripcion: tarea.descripcion,
            estado: tarea.estado,
            id_proyecto: tarea.id_proyecto,
            fecha_vencimiento: tarea.fecha_vencimiento
        }, { transaction: tx });
    }
    async getTareaById(id, tx) {
        return Tarea.findByPk(id, {
            include: ['proyecto'],
            transaction: tx
        });
    }
    async getAllTareas(filters, tx) {
        const where = {};
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
    async updateTarea(tarea, tx) {
        await Tarea.update({
            titulo: tarea.titulo,
            descripcion: tarea.descripcion,
            estado: tarea.estado,
            id_proyecto: tarea.id_proyecto,
            fecha_vencimiento: tarea.fecha_vencimiento
        }, {
            where: { id: tarea.id },
            transaction: tx
        });
        return this.getTareaById(tarea.id, tx);
    }
    async updateEstadoTarea(id, estado, tx) {
        await Tarea.update({ estado }, {
            where: { id },
            transaction: tx
        });
        return this.getTareaById(id, tx);
    }
    async deleteTarea(id, tx) {
        const deletedRows = await Tarea.destroy({
            where: { id },
            transaction: tx
        });
        return deletedRows > 0;
    }
}
