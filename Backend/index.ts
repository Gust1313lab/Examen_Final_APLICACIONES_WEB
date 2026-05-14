
import { Categoriasrouter } from './src/interfaces/routes/CategoriaRoutes';
import { Autoresrouter } from './src/interfaces/routes/AutorRoutes';
import { Librosrouter } from './src/interfaces/routes/LibroRoutes';
import { Usuariosrouter } from './src/interfaces/routes/UsuarioRoutes';
import { Reservasrouter } from './src/interfaces/routes/ReservaRoutes';

export const registerRoutes = (app: any) => {
    app.use('/api', Categoriasrouter);
    app.use('/api', Autoresrouter);
    app.use('/api', Librosrouter);
    app.use('/api', Usuariosrouter);
    app.use('/api', Reservasrouter);
};