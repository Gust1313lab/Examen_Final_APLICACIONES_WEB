import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UsuarioDTO } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) { }

  // POST - Crear nuevo usuario
  createUsuario(usuario: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(this.apiUrl, usuario);
  }

  // GET - Obtener todos los usuarios
  getAllUsuarios(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(this.apiUrl);
  }

  // GET - Obtener usuario por ID
  getUsuarioById(id: number): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.apiUrl}/${id}`);
  }

  // PUT - Actualizar usuario
  updateUsuario(id: number, usuario: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.put<UsuarioDTO>(`${this.apiUrl}/${id}`, usuario);
  }

  // DELETE - Eliminar usuario
  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // GET - Obtener usuario por email
  getUsuarioPorEmail(email: string): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.apiUrl}/email/${email}`);
  }

  // POST - Login (verificar credenciales)
  login(email: string, contraseña: string): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(`${this.apiUrl}/login`, { email, contraseña });
  }
}
