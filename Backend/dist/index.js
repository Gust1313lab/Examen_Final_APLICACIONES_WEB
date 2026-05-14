import { ProyectosRouter } from './src/interfaces/routes/ProyectoRoutes';
import { TareasRouter } from './src/interfaces/routes/TareaRoutes';
export const registerRoutes = (app) => {
    app.use('/api', ProyectosRouter);
    app.use('/api', TareasRouter);
};
