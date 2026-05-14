import { UsuarioDTO } from './usuario.interface';
import { LibroDTO } from './libro.interface';

export interface ReservaDTO {
    id?: number;
    id_usuario: number;
    id_libro: number;
    fecha_reserva?: Date;
    fecha_vencimiento?: Date;
    estado: 'activa' | 'completada' | 'cancelada';
    usuario?: UsuarioDTO;
    libro?: LibroDTO;
}
