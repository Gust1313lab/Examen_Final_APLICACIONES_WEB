import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/sequelize';
export class Proyecto extends Model {
}
Proyecto.init({
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
}, {
    sequelize,
    tableName: 'proyectos',
    timestamps: false
});
