import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CategoriaDTO } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {
    private apiUrl = `${environment.apiUrl}/categorias`;

    constructor(private http: HttpClient) { }

    // POST - Crear nueva categoría
    createCategoria(categoria: CategoriaDTO): Observable<CategoriaDTO> {
        return this.http.post<CategoriaDTO>(this.apiUrl, categoria);
    }

    // GET - Obtener todas las categorías
    getAllCategorias(): Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(this.apiUrl);
    }

    // GET - Obtener categoría por ID
    getCategoriaById(id: number): Observable<CategoriaDTO> {
        return this.http.get<CategoriaDTO>(`${this.apiUrl}/${id}`);
    }

    // PUT - Actualizar categoría
    updateCategoria(id: number, categoria: CategoriaDTO): Observable<CategoriaDTO> {
        return this.http.put<CategoriaDTO>(`${this.apiUrl}/${id}`, categoria);
    }

    // DELETE - Eliminar categoría
    deleteCategoria(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
