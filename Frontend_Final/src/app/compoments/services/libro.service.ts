import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LibroDTO } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class LibroService {
    private apiUrl = `${environment.apiUrl}/libros`;

    constructor(private http: HttpClient) { }

    // POST - Crear nuevo libro
    createLibro(libro: LibroDTO): Observable<LibroDTO> {
        return this.http.post<LibroDTO>(this.apiUrl, libro);
    }

    // GET - Obtener todos los libros
    getAllLibros(): Observable<LibroDTO[]> {
        return this.http.get<LibroDTO[]>(this.apiUrl);
    }

    // GET - Obtener libro por ID
    getLibroById(id: number): Observable<LibroDTO> {
        return this.http.get<LibroDTO>(`${this.apiUrl}/${id}`);
    }

    // PUT - Actualizar libro
    updateLibro(id: number, libro: LibroDTO): Observable<LibroDTO> {
        return this.http.put<LibroDTO>(`${this.apiUrl}/${id}`, libro);
    }

    // DELETE - Eliminar libro
    deleteLibro(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // GET - Obtener libros por categoría
    getLibrosPorCategoria(idCategoria: number): Observable<LibroDTO[]> {
        return this.http.get<LibroDTO[]>(`${this.apiUrl}?categoria=${idCategoria}`);
    }

    // GET - Obtener libros disponibles
    getLibrosDisponibles(): Observable<LibroDTO[]> {
        return this.http.get<LibroDTO[]>(`${this.apiUrl}?disponibles=true`);
    }
}
