import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ReservaDTO } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ReservaService {
    private apiUrl = `${environment.apiUrl}/reservas`;

    constructor(private http: HttpClient) { }

    // POST - Crear nueva reserva
    createReserva(reserva: ReservaDTO): Observable<ReservaDTO> {
        return this.http.post<ReservaDTO>(this.apiUrl, reserva);
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
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // GET - Obtener reservas por usuario
    getReservasPorUsuario(idUsuario: number): Observable<ReservaDTO[]> {
        return this.http.get<ReservaDTO[]>(`${this.apiUrl}?usuario=${idUsuario}`);
    }

    // GET - Obtener reservas por libro
    getReservasPorLibro(idLibro: number): Observable<ReservaDTO[]> {
        return this.http.get<ReservaDTO[]>(`${this.apiUrl}?libro=${idLibro}`);
    }

    // GET - Obtener reservas activas
    getReservasActivas(): Observable<ReservaDTO[]> {
        return this.http.get<ReservaDTO[]>(`${this.apiUrl}?estado=activa`);
    }

    // PUT - Cambiar estado de reserva
    cambiarEstadoReserva(id: number, estado: 'activa' | 'completada' | 'cancelada'): Observable<ReservaDTO> {
        return this.http.put<ReservaDTO>(`${this.apiUrl}/${id}/estado`, { estado });
    }
}
