import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, finalize, switchMap, timeout } from 'rxjs/operators';
import { TareaDTO, TareasResponse, TareaPorIdResponse, EstadoTarea } from '../interfaces/tarea.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = `${environment.apiUrl}/tareas`;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Error en la API'));
  }

  getTareas(): Observable<TareaDTO[]> {
    return this.http.get<TareaDTO[]>(this.apiUrl).pipe(
      timeout(10000),
      catchError(this.handleError)
    );
  }

  getTareasPorEstado(estado: EstadoTarea): Observable<TareaDTO[]> {
    return this.http.get<TareaDTO[]>(`${this.apiUrl}/estado/${estado}`).pipe(
      timeout(10000),
      catchError(this.handleError)
    );
  }

  getTareasPorProyecto(idProyecto: number): Observable<TareaDTO[]> {
    return this.http.get<TareaDTO[]>(`${this.apiUrl}/proyecto/${idProyecto}`).pipe(
      timeout(10000),
      catchError(this.handleError)
    );
  }

  getTarea(id: number): Observable<TareaPorIdResponse> {
    return this.http.get<TareaPorIdResponse>(`${this.apiUrl}/${id}`).pipe(
      timeout(10000),
      catchError(this.handleError)
    );
  }

  crearTarea(tarea: TareaDTO): Observable<TareaPorIdResponse> {
    return this.http.post<TareaPorIdResponse>(this.apiUrl, tarea).pipe(
      timeout(10000),
      catchError(this.handleError)
    );
  }

  actualizarTarea(id: number, tarea: Partial<TareaDTO>): Observable<TareaPorIdResponse> {
    return this.http.put<TareaPorIdResponse>(`${this.apiUrl}/${id}`, tarea).pipe(
      timeout(10000),
      catchError(this.handleError)
    );
  }

  cambiarEstado(id: number, estado: EstadoTarea): Observable<TareaPorIdResponse> {
    return this.http.patch<TareaPorIdResponse>(`${this.apiUrl}/${id}/estado`, { estado }).pipe(
      timeout(10000),
      catchError(this.handleError)
    );
  }

  eliminarTarea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      timeout(10000),
      catchError(this.handleError)
    );
  }
}
