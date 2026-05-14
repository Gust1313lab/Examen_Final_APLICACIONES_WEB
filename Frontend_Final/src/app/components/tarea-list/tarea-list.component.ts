import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TareaService } from '../../services/tarea.service';
import { RouterLink } from '@angular/router';
import { TareaDTO, EstadoTarea } from '../../interfaces/tarea.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tarea-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './tarea-list.component.html',
  styleUrl: './tarea-list.component.css'
})
export class TareaListComponent implements OnInit {
  tareas: TareaDTO[] = [];
  tareasFiltradas: TareaDTO[] = [];
  loading = false;
  filtroEstado: EstadoTarea | 'todas' = 'todas';
  estados = EstadoTarea;

  private tareaService = inject(TareaService);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.loading = true;
    this.tareaService.getTareas().subscribe({
      next: (tareas) => {
        this.tareas = tareas;
        this.filtrarTareas();
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Error al cargar las tareas', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  filtrarTareas(): void {
    if (this.filtroEstado === 'todas') {
      this.tareasFiltradas = this.tareas;
    } else {
      this.tareasFiltradas = this.tareas.filter(t => t.estado === this.filtroEstado);
    }
  }

  cambiarEstado(tarea: TareaDTO): void {
    const nuevosEstados = [EstadoTarea.PENDIENTE, EstadoTarea.EN_PROGRESO, EstadoTarea.COMPLETADA];
    const currentIndex = nuevosEstados.indexOf(tarea.estado);
    const siguienteEstado = nuevosEstados[(currentIndex + 1) % nuevosEstados.length];

    this.tareaService.cambiarEstado(tarea.id!, siguienteEstado).subscribe({
      next: () => {
        tarea.estado = siguienteEstado;
        this.snackBar.open('Estado actualizado', 'Cerrar', { duration: 2000 });
      },
      error: () => {
        this.snackBar.open('Error al actualizar el estado', 'Cerrar', { duration: 3000 });
      }
    });
  }

  getEstadoClase(estado: EstadoTarea): string {
    switch (estado) {
      case EstadoTarea.PENDIENTE: return 'estado-pendiente';
      case EstadoTarea.EN_PROGRESO: return 'estado-progreso';
      case EstadoTarea.COMPLETADA: return 'estado-completada';
      default: return '';
    }
  }
}
