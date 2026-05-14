import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/sequelize';

export class Reserva extends Model {
    public id!: number;
    public id_usuario!: number;
    public id_libro!: number;
    public fecha_reserva?: Date | null;
    public fecha_vencimiento?: Date | null;
    public estado!: string;
}

Reserva.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'usuarios',
                key: 'id'
            }
        },
        id_libro: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'libros',
                key: 'id'
            }
        },
        fecha_reserva: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        fecha_vencimiento: {
            type: DataTypes.DATE,
            allowNull: true
        },
        estado: {
            type: DataTypes.ENUM('activa', 'completada', 'cancelada'),
            allowNull: false,
            defaultValue: 'activa'
        }
    },
    {
        sequelize,
        tableName: 'reservas',
        timestamps: false
    }
);
