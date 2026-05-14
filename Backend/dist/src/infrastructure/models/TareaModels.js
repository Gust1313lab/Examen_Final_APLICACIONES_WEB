import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/sequelize';
export const ESTADOS_TAREA = ['pendiente', 'en_progreso', 'completada'];
export class Tarea extends Model {
}
Tarea.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING(120),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    estado: {
        type: DataTypes.ENUM(...ESTADOS_TAREA),
        allowNull: false,
        defaultValue: 'pendiente'
    },
    id_proyecto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_vencimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'tareas',
    timestamps: false
});
