import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AutorDTO } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class AutorService {
    private apiUrl = `${environment.apiUrl}/autores`;

    constructor(private http: HttpClient) { }

    // POST - Crear nuevo autor
    createAutor(autor: AutorDTO): Observable<AutorDTO> {
        return this.http.post<AutorDTO>(this.apiUrl, autor);
    }

    // GET - Obtener todos los autores
    getAllAutores(): Observable<AutorDTO[]> {
        return this.http.get<AutorDTO[]>(this.apiUrl);
    }

    // GET - Obtener autor por ID
    getAutorById(id: number): Observable<AutorDTO> {
        return this.http.get<AutorDTO>(`${this.apiUrl}/${id}`);
    }

    // PUT - Actualizar autor
    updateAutor(id: number, autor: AutorDTO): Observable<AutorDTO> {
        return this.http.put<AutorDTO>(`${this.apiUrl}/${id}`, autor);
    }

    // DELETE - Eliminar autor
    deleteAutor(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
