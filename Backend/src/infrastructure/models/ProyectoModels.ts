import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface ProyectoAttributes {
    id: number;
    nombre: string;
    descripcion?: string | null;
    fecha_limite?: Date | null;
}

interface ProyectoCreationAttributes extends Optional<ProyectoAttributes, 'id'> {}

export class Proyecto extends Model<ProyectoAttributes, ProyectoCreationAttributes> implements ProyectoAttributes {
    public id!: number;
    public nombre!: string;
    public descripcion?: string | null;
    public fecha_limite?: Date | null;
}

Proyecto.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(120),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        fecha_limite: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'proyectos',
        timestamps: false
    }
);
