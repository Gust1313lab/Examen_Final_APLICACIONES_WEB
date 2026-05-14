import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/sequelize';

export class Libro extends Model {
    public id!: number;
    public titulo!: string;
    public descripcion?: string | null;
    public isbn!: string;
    public id_categoria!: number;
    public anio_publicacion?: number | null;
    public disponibles!: number;
}

Libro.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        isbn: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        id_categoria: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categorias',
                key: 'id'
            }
        },
        anio_publicacion: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        disponibles: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        sequelize,
        tableName: 'libros',
        timestamps: false
    }
);
