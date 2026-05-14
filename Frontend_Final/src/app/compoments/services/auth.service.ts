import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioDTO } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<UsuarioDTO | null>(null);

    public currentUser$ = this.currentUserSubject.asObservable();

    // Credenciales quemadas para demostracion
    private usuariosRegistrados: UsuarioDTO[] = [
        {
            id: 1,
            nombre: 'Juan Perez',
            email: 'juan@example.com',
            contraseña: 'password123',
            fecha_registro: new Date()
        },
        {
            id: 2,
            nombre: 'Maria Garcia',
            email: 'maria@example.com',
            contraseña: 'password456',
            fecha_registro: new Date()
        },
        {
            id: 3,
            nombre: 'Admin User',
            email: 'admin@example.com',
            contraseña: 'admin123',
            fecha_registro: new Date()
        }
    ];

    login(email: string, contraseña: string): Observable<UsuarioDTO | null> {
        return new Observable(observer => {
            const usuario = this.usuariosRegistrados.find(
                item => item.email === email && item.contraseña === contraseña
            );

            if (usuario) {
                this.currentUserSubject.next(usuario);
                observer.next(usuario);
            } else {
                observer.error('Credenciales invalidas');
            }

            observer.complete();
        });
    }

    logout(): void {
        this.currentUserSubject.next(null);
    }

    getCurrentUser(): UsuarioDTO | null {
        return this.currentUserSubject.value;
    }

    isAuthenticated(): boolean {
        return this.currentUserSubject.value !== null;
    }
}
