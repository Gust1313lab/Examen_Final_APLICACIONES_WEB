import { Component, inject, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { LibroDTO, ReservaDTO } from '../interfaces';
import { ReservaService } from '../services/reserva.service';
import { AuthService } from '../services/auth.service';
import { LibroService } from '../services/libro.service';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule
  ],
  templateUrl: './mis-reservas.html',
  styleUrl: './mis-reservas.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MisReservasComponent implements OnInit, OnDestroy {
  reservas: ReservaDTO[] = [];
  reservasOriginales: ReservaDTO[] = [];
  loading = true;
  procesando = false;
  reservaProcesando: number | null = null;

  displayedColumns: string[] = ['libro', 'estado', 'fechaReserva', 'fechaVencimiento', 'acciones'];

  private reservaService = inject(ReservaService);
  private libroService = inject(LibroService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Esperar a que haya un usuario antes de cargar
    const usuario = this.authService.getCurrentUser();
    if (usuario && usuario.id) {
      this.cargarMisReservas();
    } else {
      // Si no hay usuario, redirigir al login
      this.snackBar.open('Debes estar autenticado', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarMisReservas(): void {
    const usuario = this.authService.getCurrentUser();
    if (!usuario || !usuario.id) {
      this.snackBar.open('Debes estar autenticado', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/login']);
      return;
    }

    this.loading = true;
    forkJoin({
      reservas: this.reservaService.getReservasPorUsuario(usuario.id!),
      libros: this.libroService.getAllLibros()
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: ({ reservas, libros }) => {
        this.reservas = this.completarReservasConLibros(reservas || [], libros || []);
        this.reservasOriginales = [...this.reservas];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al cargar reservas:', err);
        this.snackBar.open('Error al cargar tus reservas', 'Cerrar', { duration: 3000 });
        this.loading = false;
        this.reservas = [];
        this.cdr.markForCheck();
      }
    });
  }

  private completarReservasConLibros(reservas: ReservaDTO[], libros: LibroDTO[]): ReservaDTO[] {
    const librosPorId = new Map<number, LibroDTO>(
      libros
        .filter((libro): libro is LibroDTO & { id: number } => libro.id !== undefined)
        .map(libro => [libro.id, libro])
    );

    return reservas.map(reserva => ({
      ...reserva,
      libro: reserva.libro ?? (reserva.id_libro ? librosPorId.get(reserva.id_libro) : undefined)
    }));
  }

  cancelarReserva(reserva: ReservaDTO): void {
    if (!reserva.id) {
      this.snackBar.open('Error al cancelar', 'Cerrar', { duration: 3000 });
      return;
    }

    this.reservaProcesando = reserva.id;
    this.procesando = true;

    this.reservaService.cambiarEstadoReserva(reserva.id!, 'cancelada').pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (res) => {
        this.snackBar.open('Reserva cancelada correctamente', 'Cerrar', { duration: 3000 });
        this.cargarMisReservas();
        this.procesando = false;
        this.reservaProcesando = null;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al cancelar:', err);
        this.snackBar.open('Error al cancelar la reserva', 'Cerrar', { duration: 3000 });
        this.procesando = false;
        this.reservaProcesando = null;
        this.cdr.markForCheck();
      }
    });
  }

  devolverLibro(reserva: ReservaDTO): void {
    if (!reserva.id) {
      this.snackBar.open('Error al devolver', 'Cerrar', { duration: 3000 });
      return;
    }

    this.reservaProcesando = reserva.id;
    this.procesando = true;

    this.reservaService.cambiarEstadoReserva(reserva.id!, 'completada').pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (res) => {
        this.snackBar.open('Libro devuelto correctamente', 'Cerrar', { duration: 3000 });
        this.cargarMisReservas();
        this.procesando = false;
        this.reservaProcesando = null;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al devolver:', err);
        this.snackBar.open('Error al devolver el libro', 'Cerrar', { duration: 3000 });
        this.procesando = false;
        this.reservaProcesando = null;
        this.cdr.markForCheck();
      }
    });
  }

  getEstadoColor(estado: string): string {
    switch (estado) {
      case 'activa':
        return 'success';
      case 'completada':
        return 'primary';
      case 'cancelada':
        return 'warn';
      default:
        return 'primary';
    }
  }

  getEstadoIcono(estado: string): string {
    switch (estado) {
      case 'activa':
        return 'check_circle';
      case 'completada':
        return 'done_all';
      case 'cancelada':
        return 'cancel';
      default:
        return 'info';
    }
  }

  formatearFecha(fecha: any): string {
    if (!fecha) return '-';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  isVencida(fecha: any): boolean {
    if (!fecha) return false;
    const hoy = new Date();
    const fechaVencimiento = new Date(fecha);
    return fechaVencimiento < hoy;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  irAlCatalogo(): void {
    this.router.navigate(['/catalogo']);
  }
}
