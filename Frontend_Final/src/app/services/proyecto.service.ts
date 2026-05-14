import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { ProyectoDTO, ProyectosResponse, ProyectoPorIdResponse } from '../interfaces/proyecto.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private apiUrl = `${environment.apiUrl}/proyectos`;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Error en la API'));
  }

  getProyectos(): Observable<ProyectoDTO[]> {
    return this.http.get<ProyectoDTO[]>(this.apiUrl).pipe(
      timeout(10000),
      catchError(this.handleError)
    );
  }

  getProyecto(id: number): Observable<ProyectoPorIdResponse> {
    return this.http.get<ProyectoPorIdResponse>(`${this.apiUrl}/${id}`).pipe(
      timeout(10000),
      catchError(this.handleError)
    );
  }

  crearProyecto(proyecto: ProyectoDTO): Observable<ProyectoPorIdResponse> {
    return this.http.post<ProyectoPorIdResponse>(this.apiUrl, proyecto).pipe(
      timeout(10000),
      catchError(this.handleError)
    );
  }

  actualizarProyecto(id: number, proyecto: Partial<ProyectoDTO>): Observable<ProyectoPorIdResponse> {
    return this.http.put<ProyectoPorIdResponse>(`${this.apiUrl}/${id}`, proyecto).pipe(
      timeout(10000),
      catchError(this.handleError)
    );
  }

  eliminarProyecto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      timeout(10000),
      catchError(this.handleError)
    );
  }
}
