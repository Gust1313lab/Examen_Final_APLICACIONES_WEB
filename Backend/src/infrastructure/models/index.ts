import { Categoria } from './CategoriaModels';
import { Autor } from './AutorModels';
import { Libro } from './LibroModels';
import { LibroAutor } from './LibroAutorModels';
import { Usuario } from './UsuarioModels';
import { Reserva } from './ReservaModels';

export const registerModels = () => {
    //  Relaciones Categorías - Libros 
    Categoria.hasMany(Libro, { foreignKey: 'id_categoria', as: 'libros' });
    Libro.belongsTo(Categoria, { foreignKey: 'id_categoria', as: 'categoria' });

    //  Relaciones Libros - Autores
    Libro.belongsToMany(Autor, {
        through: LibroAutor,
        foreignKey: 'id_libro',
        otherKey: 'id_autor',
        as: 'autores'
    });
    Autor.belongsToMany(Libro, {
        through: LibroAutor,
        foreignKey: 'id_autor',
        otherKey: 'id_libro',
        as: 'libros'
    });

    LibroAutor.belongsTo(Libro, { foreignKey: 'id_libro' });
    LibroAutor.belongsTo(Autor, { foreignKey: 'id_autor' });
    Libro.hasMany(LibroAutor, { foreignKey: 'id_libro', as: 'libro_autores' });
    Autor.hasMany(LibroAutor, { foreignKey: 'id_autor', as: 'libro_autores' });

    //  Relaciones Usuarios - Reservas 
    Usuario.hasMany(Reserva, { foreignKey: 'id_usuario', as: 'reservas' });
    Reserva.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

    //  Relaciones Libros - Reservas 
    Libro.hasMany(Reserva, { foreignKey: 'id_libro', as: 'reservas' });
    Reserva.belongsTo(Libro, { foreignKey: 'id_libro', as: 'libro' });

    return {
        Categoria,
        Autor,
        Libro,
        LibroAutor,
        Usuario,
        Reserva
    };
};