import { Proyecto } from './ProyectoModels';
import { Tarea } from './TareaModels';
export const registerModels = () => {
    Proyecto.hasMany(Tarea, {
        foreignKey: 'id_proyecto',
        as: 'tareas',
        onDelete: 'CASCADE'
    });
    Tarea.belongsTo(Proyecto, {
        foreignKey: 'id_proyecto',
        as: 'proyecto'
    });
    return {
        Proyecto,
        Tarea
    };
};
