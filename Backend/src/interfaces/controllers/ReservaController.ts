import { Request, Response } from "express";
import { ReservaServiceImpl } from "../../infrastructure/services/ReservaServiceImpl";
import { Reserva } from "../../infrastructure/models/ReservaModels";

const reservaService = new ReservaServiceImpl();

export class ReservaController {
    async createReserva(req: Request, res: Response) {
        console.log("request:", req.body);
        const { id_usuario, id_libro, fecha_vencimiento } = req.body;
        try {
            if (!id_usuario || !id_libro) {
                return res.status(400).json({ message: "ID Usuario e ID Libro son requeridos" });
            }
            const reserva = new Reserva();
            reserva.id_usuario = id_usuario;
            reserva.id_libro = id_libro;
            reserva.fecha_reserva = new Date();
            reserva.fecha_vencimiento = fecha_vencimiento;
            reserva.estado = 'activa';
            const createdReserva = await reservaService.createReserva(reserva);
            res.status(201).json(createdReserva);
        } catch (error: any) {
            console.error("Error creating reserva:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getReservaById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const reserva = await reservaService.getReservaById(Number(id));
            if (!reserva) {
                return res.status(404).json({ message: "Reserva no encontrada" });
            }
            res.status(200).json(reserva);
        } catch (error) {
            console.error("Error fetching reserva:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getReservasByUsuario(req: Request, res: Response) {
        const { id_usuario } = req.params;
        try {
            const reservas = await reservaService.getReservasByUsuario(Number(id_usuario));
            res.status(200).json(reservas);
        } catch (error) {
            console.error("Error fetching reservas por usuario:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getReservasByLibro(req: Request, res: Response) {
        const { id_libro } = req.params;
        try {
            const reservas = await reservaService.getReservasByLibro(Number(id_libro));
            res.status(200).json(reservas);
        } catch (error) {
            console.error("Error fetching reservas por libro:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getAllReservas(req: Request, res: Response) {
        try {
            const reservas = await reservaService.getAllReservas();
            res.status(200).json(reservas);
        } catch (error) {
            console.error("Error fetching reservas:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async cancelarReserva(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const reserva = await reservaService.getReservaById(Number(id));
            if (!reserva) {
                return res.status(404).json({ message: "Reserva no encontrada" });
            }
            const updatedReserva = await reservaService.updateEstadoReserva(Number(id), 'cancelada');
            res.status(200).json({ message: "Reserva cancelada exitosamente", reserva: updatedReserva });
        } catch (error) {
            console.error("Error canceling reserva:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async devolverLibro(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const reserva = await reservaService.getReservaById(Number(id));
            if (!reserva) {
                return res.status(404).json({ message: "Reserva no encontrada" });
            }
            const updatedReserva = await reservaService.updateEstadoReserva(Number(id), 'completada');
            res.status(200).json({ message: "Libro devuelto exitosamente", reserva: updatedReserva });
        } catch (error) {
            console.error("Error returning libro:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async updateReserva(req: Request, res: Response) {
        const { id } = req.params;
        const { id_usuario, id_libro, fecha_vencimiento, estado } = req.body;
        try {
            const existingReserva = await reservaService.getReservaById(Number(id));
            if (!existingReserva) {
                return res.status(404).json({ message: "Reserva no encontrada" });
            }
            existingReserva.id_usuario = id_usuario || existingReserva.id_usuario;
            existingReserva.id_libro = id_libro || existingReserva.id_libro;
            existingReserva.fecha_vencimiento = fecha_vencimiento || existingReserva.fecha_vencimiento;
            existingReserva.estado = estado || existingReserva.estado;
            const updatedReserva = await reservaService.updateReserva(existingReserva);
            res.status(200).json(updatedReserva);
        } catch (error) {
            console.error("Error updating reserva:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async deleteReserva(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await reservaService.deleteReserva(Number(id));
            if (result) {
                res.status(200).json({ message: "Reserva eliminada exitosamente" });
            } else {
                res.status(404).json({ message: "Reserva no encontrada" });
            }
        } catch (error) {
            console.error("Error deleting reserva:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
