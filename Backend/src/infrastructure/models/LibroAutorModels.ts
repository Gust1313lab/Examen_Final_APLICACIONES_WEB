import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/sequelize';

export class LibroAutor extends Model {
    public id_libro!: number;
    public id_autor!: number;
}

LibroAutor.init(
    {
        id_libro: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'libros',
                key: 'id'
            }
        },
        id_autor: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'autores',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        tableName: 'libro_autores',
        timestamps: false
    }
);
