import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioDTO } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private platformId = inject(PLATFORM_ID);
    
    private currentUserSubject = new BehaviorSubject<UsuarioDTO | null>(null);
    
    public currentUser$ = this.currentUserSubject.asObservable();

    // Credenciales quemadas para demostración
    private usuariosRegistrados: UsuarioDTO[] = [
        {
        id: 1,
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        contraseña: 'password123',
        fecha_registro: new Date()
        },
        {
        id: 2,
        nombre: 'María García',
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

    constructor() {
        this.initializeUser();
    }

    private isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    private initializeUser(): void {
        if (this.isBrowser()) {
        try {
            const stored = localStorage.getItem('currentUser');
            if (stored) {
            this.currentUserSubject.next(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Error reading user from localStorage:', e);
        }
        }
    }

    login(email: string, contraseña: string): Observable<UsuarioDTO | null> {
        return new Observable(observer => {
        const usuario = this.usuariosRegistrados.find(
            u => u.email === email && u.contraseña === contraseña
        );

        if (usuario) {
            if (this.isBrowser()) {
            try {
                localStorage.setItem('currentUser', JSON.stringify(usuario));
            } catch (e) {
                console.error('Error saving user to localStorage:', e);
            }
            }
            this.currentUserSubject.next(usuario);
            observer.next(usuario);
        } else {
            observer.error('Credenciales inválidas');
        }
        observer.complete();
        });
    }

    logout(): void {
        if (this.isBrowser()) {
        try {
            localStorage.removeItem('currentUser');
        } catch (e) {
            console.error('Error removing user from localStorage:', e);
        }
        }
        this.currentUserSubject.next(null);
    }

    getCurrentUser(): UsuarioDTO | null {
        return this.currentUserSubject.value;
    }

    isAuthenticated(): boolean {
        return this.currentUserSubject.value !== null;
    }
}
