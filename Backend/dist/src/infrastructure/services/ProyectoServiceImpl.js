import { Proyecto } from '../models/ProyectoModels';
export class ProyectoServiceImpl {
    async createProyecto(proyecto, tx) {
        return Proyecto.create({
            nombre: proyecto.nombre,
            descripcion: proyecto.descripcion,
            fecha_limite: proyecto.fecha_limite
        }, { transaction: tx });
    }
    async getProyectoById(id, tx) {
        return Proyecto.findByPk(id, {
            include: ['tareas'],
            transaction: tx
        });
    }
    async getAllProyectos(tx) {
        return Proyecto.findAll({
            include: ['tareas'],
            order: [['id', 'ASC']],
            transaction: tx
        });
    }
    async updateProyecto(proyecto, tx) {
        await Proyecto.update({
            nombre: proyecto.nombre,
            descripcion: proyecto.descripcion,
            fecha_limite: proyecto.fecha_limite
        }, {
            where: { id: proyecto.id },
            transaction: tx
        });
        return this.getProyectoById(proyecto.id, tx);
    }
    async deleteProyecto(id, tx) {
        const deletedRows = await Proyecto.destroy({
            where: { id },
            transaction: tx
        });
        return deletedRows > 0;
    }
}
