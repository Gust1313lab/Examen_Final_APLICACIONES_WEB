import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/sequelize';

export class Autor extends Model {
    public id!: number;
    public nombre!: string;
    public biografia?: string | null;
    public fecha_nacimiento?: Date | null;
}

Autor.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        biografia: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        fecha_nacimiento: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'autores',
        timestamps: false
    }
);
