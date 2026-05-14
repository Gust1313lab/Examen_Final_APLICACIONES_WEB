import { Component, inject, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LibroDTO, ReservaDTO } from '../interfaces';
import { LibroService } from '../services/libro.service';
import { ReservaService } from '../services/reserva.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule
  ],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogoComponent implements OnInit, OnDestroy {
  libros: LibroDTO[] = [];
  librosOriginales: LibroDTO[] = [];
  loading = true;
  reservando = false;
  libroReservando: number | null = null;

  private libroService = inject(LibroService);
  private reservaService = inject(ReservaService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.cargarLibrosDisponibles();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarLibrosDisponibles(): void {
    this.loading = true;
    this.libroService.getLibrosDisponibles().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (libros) => {
        this.libros = libros || [];
        this.librosOriginales = [...this.libros];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al cargar libros:', err);
        this.snackBar.open('Error al cargar los libros', 'Cerrar', { duration: 3000 });
        this.loading = false;
        this.libros = [];
        this.cdr.markForCheck();
      }
    });
  }

  reservarLibro(libro: LibroDTO): void {
    const usuario = this.authService.getCurrentUser();
    if (!usuario || !usuario.id) {
      this.snackBar.open('Debes estar autenticado', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/login']);
      return;
    }

    if (!libro.id) {
      this.snackBar.open('Error al reservar', 'Cerrar', { duration: 3000 });
      return;
    }

    this.libroReservando = libro.id;
    this.reservando = true;

    const reserva: ReservaDTO = {
      id_usuario: usuario.id,
      id_libro: libro.id,
      fecha_reserva: new Date(),
      fecha_vencimiento: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 días
      estado: 'activa'
    };

    this.reservaService.createReserva(reserva).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (res) => {
        this.snackBar.open(`¡${libro.titulo} reservado correctamente!`, 'Cerrar', { duration: 3000 });
        this.cargarLibrosDisponibles(); // Recargar invisible
        this.reservando = false;
        this.libroReservando = null;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al reservar:', err);
        this.snackBar.open('Error al reservar el libro', 'Cerrar', { duration: 3000 });
        this.reservando = false;
        this.libroReservando = null;
        this.cdr.markForCheck();
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  irAMisReservas(): void {
    this.router.navigate(['/mis-reservas']);
  }
}
