import { ProyectoServiceImpl } from '../../infrastructure/services/ProyectoServiceImpl';
import { TareaServiceImpl } from '../../infrastructure/services/TareaServiceImpl';
import { ESTADOS_TAREA, Tarea } from '../../infrastructure/models/TareaModels';
const tareaService = new TareaServiceImpl();
const proyectoService = new ProyectoServiceImpl();
const isValidEstado = (estado) => {
    return ESTADOS_TAREA.includes(estado);
};
export class TareaController {
    async createTarea(req, res) {
        try {
            const { titulo, descripcion, estado, id_proyecto, fecha_vencimiento } = req.body;
            if (!titulo || !id_proyecto) {
                return res.status(400).json({ message: 'El titulo y el id_proyecto son requeridos' });
            }
            if (estado && !isValidEstado(estado)) {
                return res.status(400).json({ message: 'Estado de tarea invalido' });
            }
            const proyecto = await proyectoService.getProyectoById(Number(id_proyecto));
            if (!proyecto) {
                return res.status(404).json({ message: 'Proyecto no encontrado' });
            }
            const tarea = new Tarea({
                titulo,
                descripcion,
                estado: estado ?? 'pendiente',
                id_proyecto: Number(id_proyecto),
                fecha_vencimiento
            });
            const createdTarea = await tareaService.createTarea(tarea);
            return res.status(201).json(createdTarea);
        }
        catch (error) {
            console.error('Error creating tarea:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    async getTareaById(req, res) {
        try {
            const tarea = await tareaService.getTareaById(Number(req.params.id));
            if (!tarea) {
                return res.status(404).json({ message: 'Tarea no encontrada' });
            }
            return res.status(200).json(tarea);
        }
        catch (error) {
            console.error('Error fetching tarea:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    async getAllTareas(req, res) {
        try {
            const { estado, id_proyecto } = req.query;
            if (typeof estado === 'string' && !isValidEstado(estado)) {
                return res.status(400).json({ message: 'Estado de tarea invalido' });
            }
            const tareas = await tareaService.getAllTareas({
                estado: typeof estado === 'string' ? estado : undefined,
                id_proyecto: typeof id_proyecto === 'string' ? Number(id_proyecto) : undefined
            });
            return res.status(200).json(tareas);
        }
        catch (error) {
            console.error('Error fetching tareas:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    async updateTarea(req, res) {
        try {
            const tarea = await tareaService.getTareaById(Number(req.params.id));
            if (!tarea) {
                return res.status(404).json({ message: 'Tarea no encontrada' });
            }
            const { titulo, descripcion, estado, id_proyecto, fecha_vencimiento } = req.body;
            if (estado && !isValidEstado(estado)) {
                return res.status(400).json({ message: 'Estado de tarea invalido' });
            }
            if (id_proyecto) {
                const proyecto = await proyectoService.getProyectoById(Number(id_proyecto));
                if (!proyecto) {
                    return res.status(404).json({ message: 'Proyecto no encontrado' });
                }
            }
            tarea.titulo = titulo ?? tarea.titulo;
            tarea.descripcion = descripcion ?? tarea.descripcion;
            tarea.estado = estado ?? tarea.estado;
            tarea.id_proyecto = id_proyecto ? Number(id_proyecto) : tarea.id_proyecto;
            tarea.fecha_vencimiento = fecha_vencimiento ?? tarea.fecha_vencimiento;
            const updatedTarea = await tareaService.updateTarea(tarea);
            return res.status(200).json(updatedTarea);
        }
        catch (error) {
            console.error('Error updating tarea:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    async updateEstadoTarea(req, res) {
        try {
            const { estado } = req.body;
            if (!estado || !isValidEstado(estado)) {
                return res.status(400).json({ message: 'Estado de tarea invalido' });
            }
            const tarea = await tareaService.getTareaById(Number(req.params.id));
            if (!tarea) {
                return res.status(404).json({ message: 'Tarea no encontrada' });
            }
            const updatedTarea = await tareaService.updateEstadoTarea(tarea.id, estado);
            return res.status(200).json(updatedTarea);
        }
        catch (error) {
            console.error('Error updating estado de tarea:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    async deleteTarea(req, res) {
        try {
            const deleted = await tareaService.deleteTarea(Number(req.params.id));
            if (!deleted) {
                return res.status(404).json({ message: 'Tarea no encontrada' });
            }
            return res.status(200).json({ message: 'Tarea eliminada exitosamente' });
        }
        catch (error) {
            console.error('Error deleting tarea:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
