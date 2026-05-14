import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/sequelize';

export class Usuario extends Model {
    public id!: number;
    public nombre!: string;
    public email!: string;
    public contraseña!: string;
    public fecha_registro?: Date | null;
}

Usuario.init(
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
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        contraseña: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        fecha_registro: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        tableName: 'usuarios',
        timestamps: false
    }
);
