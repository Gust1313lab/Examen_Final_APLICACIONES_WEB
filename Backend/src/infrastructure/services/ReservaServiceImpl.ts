import { Transaction } from "sequelize";
import { ReservaService } from "../../domain/services/ReservaService";
import { Reserva } from "../models/ReservaModels";
import { Usuario } from "../models/UsuarioModels";
import { Libro } from "../models/LibroModels";

export class ReservaServiceImpl implements ReservaService {
    async createReserva(
        reserva: Reserva,
        tx?: Transaction
    ): Promise<Reserva> {
        return await Reserva.create({
            id_usuario: reserva.id_usuario,
            id_libro: reserva.id_libro,
            fecha_reserva: reserva.fecha_reserva,
            fecha_vencimiento: reserva.fecha_vencimiento,
            estado: reserva.estado
        },
        { transaction: tx }
        ).then(createdReserva => {
            console.log("Reserva creada exitosamente");
            return createdReserva;
        })
        .catch(error => { throw new Error(`Error al crear reserva: ${error}`) })
        .finally(() => { console.log("createReserva finalizado") });
    }

    async getReservaById(id: number, tx?: Transaction): Promise<Reserva | null> {
        return await Reserva.findByPk(id, {
            include: [
                { model: Usuario, as: 'usuario' },
                { model: Libro, as: 'libro' }
            ],
            transaction: tx
        })
            .then(reserva => reserva || null)
            .catch(error => { throw new Error(`Error al obtener reserva: ${error}`) })
            .finally(() => { console.log("getReservaById finalizado") });
    }

    async getReservasByUsuario(id_usuario: number, tx?: Transaction): Promise<Reserva[]> {
        return await Reserva.findAll({
            where: { id_usuario },
            include: [
                { model: Usuario, as: 'usuario' },
                { model: Libro, as: 'libro' }
            ],
            transaction: tx
        })
            .then(reservas => reservas)
            .catch(error => { throw new Error(`Error al obtener reservas del usuario: ${error}`) })
            .finally(() => { console.log("getReservasByUsuario finalizado") });
    }

    async getReservasByLibro(id_libro: number, tx?: Transaction): Promise<Reserva[]> {
        return await Reserva.findAll({
            where: { id_libro },
            include: [
                { model: Usuario, as: 'usuario' },
                { model: Libro, as: 'libro' }
            ],
            transaction: tx
        })
            .then(reservas => reservas)
            .catch(error => { throw new Error(`Error al obtener reservas del libro: ${error}`) })
            .finally(() => { console.log("getReservasByLibro finalizado") });
    }

    async getAllReservas(tx?: Transaction): Promise<Reserva[]> {
        return await Reserva.findAll({
            include: [
                { model: Usuario, as: 'usuario' },
                { model: Libro, as: 'libro' }
            ],
            transaction: tx
        })
            .then(reservas => reservas)
            .catch(error => { throw new Error(`Error al obtener reservas: ${error}`) })
            .finally(() => { console.log("getAllReservas finalizado") });
    }

    async updateReserva(
        reserva: Reserva,
        tx?: Transaction
    ): Promise<Reserva | null> {
        return await Reserva.update({
            id_usuario: reserva.id_usuario,
            id_libro: reserva.id_libro,
            fecha_reserva: reserva.fecha_reserva,
            fecha_vencimiento: reserva.fecha_vencimiento,
            estado: reserva.estado
        },
        { where: { id: reserva.id }, transaction: tx }
        ).then(async () => {
            const reservaActualizada = await Reserva.findByPk(reserva.id, {
                include: [
                    { model: Usuario, as: 'usuario' },
                    { model: Libro, as: 'libro' }
                ],
                transaction: tx
            });
            console.log("Reserva actualizada exitosamente");
            return reservaActualizada;
        })
        .catch(error => { throw new Error(`Error al actualizar reserva: ${error}`) })
        .finally(() => { console.log("updateReserva finalizado") });
    }

    async deleteReserva(id: number, tx?: Transaction): Promise<boolean> {
        return await Reserva.destroy({
            where: { id },
            transaction: tx
        })
            .then(resultado => resultado > 0)
            .catch(error => { throw new Error(`Error al eliminar reserva: ${error}`) })
            .finally(() => { console.log("deleteReserva finalizado") });
    }

    async updateEstadoReserva(
        id: number,
        estado: string,
        tx?: Transaction
    ): Promise<Reserva | null> {
        return await Reserva.update({
            estado
        },
        { where: { id }, transaction: tx }
        ).then(async () => {
            const reservaActualizada = await Reserva.findByPk(id, {
                include: [
                    { model: Usuario, as: 'usuario' },
                    { model: Libro, as: 'libro' }
                ],
                transaction: tx
            });
            console.log(`Reserva actualizada a estado: ${estado}`);
            return reservaActualizada;
        })
        .catch(error => { throw new Error(`Error al actualizar estado de reserva: ${error}`) })
        .finally(() => { console.log("updateEstadoReserva finalizado") });
    }
}
