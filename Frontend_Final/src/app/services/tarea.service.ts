import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TareaDTO, TareasResponse, TareaPorIdResponse, EstadoTarea } from '../interfaces/tarea.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = `${environment.apiUrl}/tareas`;

  constructor(private http: HttpClient) {}

  getTareas(): Observable<TareaDTO[]> {
    return this.http.get<TareaDTO[]>(this.apiUrl);
  }

  getTareasPorEstado(estado: EstadoTarea): Observable<TareaDTO[]> {
    return this.http.get<TareaDTO[]>(`${this.apiUrl}/estado/${estado}`);
  }

  getTareasPorProyecto(idProyecto: number): Observable<TareaDTO[]> {
    return this.http.get<TareaDTO[]>(`${this.apiUrl}/proyecto/${idProyecto}`);
  }

  getTarea(id: number): Observable<TareaPorIdResponse> {
    return this.http.get<TareaPorIdResponse>(`${this.apiUrl}/${id}`);
  }

  crearTarea(tarea: TareaDTO): Observable<TareaPorIdResponse> {
    return this.http.post<TareaPorIdResponse>(this.apiUrl, tarea);
  }

  actualizarTarea(id: number, tarea: Partial<TareaDTO>): Observable<TareaPorIdResponse> {
    return this.http.put<TareaPorIdResponse>(`${this.apiUrl}/${id}`, tarea);
  }

  cambiarEstado(id: number, estado: EstadoTarea): Observable<TareaPorIdResponse> {
    return this.http.patch<TareaPorIdResponse>(`${this.apiUrl}/${id}/estado`, { estado });
  }

  eliminarTarea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
