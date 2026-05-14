import { Transaction } from "sequelize";
import { Reserva } from "../../infrastructure/models/ReservaModels";

export interface ReservaService {
    createReserva(
        reserva: Reserva,
        tx?: Transaction
    ): Promise<Reserva>;

    getReservaById(
        id: number,
        tx?: Transaction
    ): Promise<Reserva | null>;

    getReservasByUsuario(
        id_usuario: number,
        tx?: Transaction
    ): Promise<Reserva[]>;

    getReservasByLibro(
        id_libro: number,
        tx?: Transaction
    ): Promise<Reserva[]>;

    getAllReservas(
        tx?: Transaction
    ): Promise<Reserva[]>;

    updateReserva(
        reserva: Reserva,
        tx?: Transaction
    ): Promise<Reserva | null>;

    deleteReserva(
        id: number,
        tx?: Transaction
    ): Promise<boolean>;

    updateEstadoReserva(
        id: number,
        estado: string,
        tx?: Transaction
    ): Promise<Reserva | null>;
}
