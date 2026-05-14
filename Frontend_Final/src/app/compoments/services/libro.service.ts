import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LibroDTO } from '../interfaces';

interface LibroConStock extends LibroDTO {
    stock_total: number;
}

@Injectable({
    providedIn: 'root'
})
export class LibroService {
    private apiUrl = `${environment.apiUrl}/libros`;
    private libros: LibroConStock[] = [];

    constructor(private http: HttpClient) { }

    private normalizarLibro(libro: LibroDTO | LibroConStock): LibroConStock {
        const libroExistente = this.libros.find(item => item.id === libro.id);
        const stockTotalExistente = libroExistente?.stock_total ?? 0;
        const stockTotalActual = (libro as LibroConStock).stock_total ?? 0;
        const stockTotal = Math.max(stockTotalExistente, stockTotalActual, libro.disponibles ?? 0);

        return {
            ...libro,
            disponibles: libro.disponibles ?? 0,
            stock_total: stockTotal
        };
    }

    private actualizarCache(libros: (LibroDTO | LibroConStock)[]): LibroConStock[] {
        this.libros = libros.map(libro => this.normalizarLibro(libro));
        return this.libros;
    }

    private persistirStock(libro: LibroConStock): void {
        if (!libro.id) {
            return;
        }

        this.http.put<LibroDTO>(`${this.apiUrl}/${libro.id}`, libro).pipe(
            map(libroActualizado => this.normalizarLibro(libroActualizado)),
            tap(libroActualizado => {
                const index = this.libros.findIndex(item => item.id === libroActualizado.id);
                if (index !== -1) {
                    this.libros[index] = libroActualizado;
                }
            }),
            catchError(error => {
                this.getAllLibros().subscribe({
                    error: () => {
                        console.error('No se pudo recargar la lista de libros tras un error de stock.', error);
                    }
                });
                return throwError(() => error);
            })
        ).subscribe({
            error: (error) => {
                console.error('Error al actualizar stock del libro:', error);
            }
        });
    }

    createLibro(libro: LibroDTO): Observable<LibroDTO> {
        return this.http.post<LibroDTO>(this.apiUrl, libro).pipe(
            tap(nuevoLibro => {
                this.libros.push(this.normalizarLibro(nuevoLibro));
            })
        );
    }

    getAllLibros(): Observable<LibroDTO[]> {
        return this.http.get<LibroDTO[]>(this.apiUrl).pipe(
            tap(libros => this.actualizarCache(libros))
        );
    }

    getLibroById(id: number): Observable<LibroDTO> {
        return this.http.get<LibroDTO>(`${this.apiUrl}/${id}`).pipe(
            tap(libro => {
                const libroNormalizado = this.normalizarLibro(libro);
                const index = this.libros.findIndex(item => item.id === id);
                if (index !== -1) {
                    this.libros[index] = libroNormalizado;
                } else {
                    this.libros.push(libroNormalizado);
                }
            })
        );
    }

    updateLibro(id: number, libro: LibroDTO): Observable<LibroDTO> {
        return this.http.put<LibroDTO>(`${this.apiUrl}/${id}`, libro).pipe(
            tap(libroActualizado => {
                const libroNormalizado = this.normalizarLibro(libroActualizado);
                const index = this.libros.findIndex(item => item.id === id);
                if (index !== -1) {
                    this.libros[index] = libroNormalizado;
                } else {
                    this.libros.push(libroNormalizado);
                }
            })
        );
    }

    deleteLibro(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
            tap(() => {
                this.libros = this.libros.filter(libro => libro.id !== id);
            })
        );
    }

    getLibrosPorCategoria(idCategoria: number): Observable<LibroDTO[]> {
        return this.http.get<LibroDTO[]>(`${this.apiUrl}/categoria/${idCategoria}`).pipe(
            tap(libros => this.actualizarCache(libros))
        );
    }

    getLibrosDisponibles(): Observable<LibroDTO[]> {
        return this.http.get<LibroDTO[]>(`${this.apiUrl}/disponibles`).pipe(
            tap(libros => this.actualizarCache(libros))
        );
    }

    decrementarStockSync(id: number): boolean {
        const libro = this.libros.find(item => item.id === id);
        if (libro && libro.disponibles > 0) {
            libro.disponibles--;
            this.persistirStock(libro);
            return true;
        }
        return false;
    }

    incrementarStockSync(id: number): boolean {
        const libro = this.libros.find(item => item.id === id);
        if (libro) {
            libro.disponibles++;
            this.persistirStock(libro);
            return true;
        }
        return false;
    }

    decrementarStock(id: number): Observable<LibroConStock> {
        const libro = this.libros.find(item => item.id === id);
        if (libro && libro.disponibles > 0) {
            libro.disponibles--;
            this.persistirStock(libro);
            return of(libro);
        }
        return throwError(() => new Error('No hay stock disponible'));
    }

    incrementarStock(id: number): Observable<LibroConStock> {
        const libro = this.libros.find(item => item.id === id);
        if (libro) {
            libro.disponibles++;
            this.persistirStock(libro);
            return of(libro);
        }
        return throwError(() => new Error('Libro no encontrado'));
    }

    getLibrosActualizados(): LibroConStock[] {
        return this.libros;
    }
}
