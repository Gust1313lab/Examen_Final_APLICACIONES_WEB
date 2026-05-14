import { connectDB, sequelize } from './sequelize';
import { registerModels } from '../models';
export const initDatabase = async () => {
    await connectDB();
    registerModels();
    await sequelize.query(`
        DROP TABLE IF EXISTS reservas, libro_autor, libros, autores, categorias, usuarios CASCADE;
        DROP TABLE IF EXISTS tareas, proyectos CASCADE;
        DROP TYPE IF EXISTS "enum_tareas_estado";
    `);
    await sequelize.sync();
};
