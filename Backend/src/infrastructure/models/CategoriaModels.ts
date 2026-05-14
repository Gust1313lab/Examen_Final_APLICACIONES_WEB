import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/sequelize';

export class Categoria extends Model {
    public id!: number;
    public nombre!: string;
    public descripcion?: string | null;
}

Categoria.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'categorias',
        timestamps: false
    }
);
