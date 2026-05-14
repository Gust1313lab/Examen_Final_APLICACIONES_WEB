import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProyectoDTO, ProyectosResponse, ProyectoPorIdResponse } from '../interfaces/proyecto.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private apiUrl = `${environment.apiUrl}/proyectos`;

  constructor(private http: HttpClient) {}

  getProyectos(): Observable<ProyectoDTO[]> {
    return this.http.get<ProyectoDTO[]>(this.apiUrl);
  }

  getProyecto(id: number): Observable<ProyectoPorIdResponse> {
    return this.http.get<ProyectoPorIdResponse>(`${this.apiUrl}/${id}`);
  }

  crearProyecto(proyecto: ProyectoDTO): Observable<ProyectoPorIdResponse> {
    return this.http.post<ProyectoPorIdResponse>(this.apiUrl, proyecto);
  }

  actualizarProyecto(id: number, proyecto: Partial<ProyectoDTO>): Observable<ProyectoPorIdResponse> {
    return this.http.put<ProyectoPorIdResponse>(`${this.apiUrl}/${id}`, proyecto);
  }

  eliminarProyecto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
