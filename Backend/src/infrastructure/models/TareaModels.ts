import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';

export const ESTADOS_TAREA = ['pendiente', 'en_progreso', 'completada'] as const;
export type EstadoTarea = (typeof ESTADOS_TAREA)[number];

interface TareaAttributes {
    id: number;
    titulo: string;
    descripcion?: string | null;
    estado: EstadoTarea;
    id_proyecto: number;
    fecha_vencimiento?: Date | null;
}

interface TareaCreationAttributes extends Optional<TareaAttributes, 'id' | 'estado'> {}

export class Tarea extends Model<TareaAttributes, TareaCreationAttributes> implements TareaAttributes {
    public id!: number;
    public titulo!: string;
    public descripcion?: string | null;
    public estado!: EstadoTarea;
    public id_proyecto!: number;
    public fecha_vencimiento?: Date | null;
}

Tarea.init(
    {
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
    },
    {
        sequelize,
        tableName: 'tareas',
        timestamps: false
    }
);
