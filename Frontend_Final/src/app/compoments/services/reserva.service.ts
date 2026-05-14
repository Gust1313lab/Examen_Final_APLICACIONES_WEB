import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ReservaDTO } from '../interfaces';
import { LibroService } from './libro.service';

@Injectable({
    providedIn: 'root'
})
export class ReservaService {
    private apiUrl = `${environment.apiUrl}/reservas`;
    private libroService = inject(LibroService);

    constructor(private http: HttpClient) { }

    // POST - Crear nueva reserva
    createReserva(reserva: ReservaDTO): Observable<ReservaDTO> {
        if (!reserva.id_libro) {
            return this.http.post<ReservaDTO>(this.apiUrl, reserva);
        }

        return this.libroService.decrementarStock(reserva.id_libro).pipe(
            switchMap(() => this.http.post<ReservaDTO>(this.apiUrl, reserva))
        );
    }

    // GET - Obtener todas las reservas
    getAllReservas(): Observable<ReservaDTO[]> {
        return this.http.get<ReservaDTO[]>(this.apiUrl);
    }

    // GET - Obtener reserva por ID
    getReservaById(id: number): Observable<ReservaDTO> {
        return this.http.get<ReservaDTO>(`${this.apiUrl}/${id}`);
    }

    // PUT - Actualizar reserva
    updateReserva(id: number, reserva: ReservaDTO): Observable<ReservaDTO> {
        return this.http.put<ReservaDTO>(`${this.apiUrl}/${id}`, reserva);
    }

    // DELETE - Eliminar reserva
    deleteReserva(id: number): Observable<void> {
        return this.getReservaById(id).pipe(
            switchMap(reserva => {
                if (reserva.id_libro && reserva.estado === 'activa') {
                    return this.libroService.incrementarStock(reserva.id_libro).pipe(
                        switchMap(() => this.http.delete<void>(`${this.apiUrl}/${id}`))
                    );
                }

                return this.http.delete<void>(`${this.apiUrl}/${id}`);
            })
        );
    }

    // GET - Obtener reservas por usuario
    getReservasPorUsuario(idUsuario: number): Observable<ReservaDTO[]> {
        return this.getAllReservas().pipe(
            map(reservas => reservas.filter(reserva => reserva.id_usuario === idUsuario))
        );
    }

    // GET - Obtener reservas por libro
    getReservasPorLibro(idLibro: number): Observable<ReservaDTO[]> {
        return this.getAllReservas().pipe(
            map(reservas => reservas.filter(reserva => reserva.id_libro === idLibro))
        );
    }

    // GET - Obtener reservas activas
    getReservasActivas(): Observable<ReservaDTO[]> {
        return this.getAllReservas().pipe(
            map(reservas => reservas.filter(reserva => reserva.estado === 'activa'))
        );
    }

    // PUT - Cambiar estado de reserva
    cambiarEstadoReserva(id: number, estado: 'activa' | 'completada' | 'cancelada'): Observable<ReservaDTO> {
        return this.getReservaById(id).pipe(
            switchMap(reserva => {
                const reservaActualizada: ReservaDTO = { ...reserva, estado };
                const debeIncrementarStock =
                    !!reserva.id_libro &&
                    reserva.estado === 'activa' &&
                    (estado === 'completada' || estado === 'cancelada');

                if (debeIncrementarStock && reserva.id_libro) {
                    return this.libroService.incrementarStock(reserva.id_libro).pipe(
                        switchMap(() => this.updateReserva(id, reservaActualizada))
                    );
                }

                return this.updateReserva(id, reservaActualizada);
            })
        );
    }
}
