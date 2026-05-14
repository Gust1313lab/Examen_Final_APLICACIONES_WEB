import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProyectoService } from '../../services/proyecto.service';
import { RouterLink } from '@angular/router';
import { ProyectoDTO } from '../../interfaces/proyecto.interface';

@Component({
  selector: 'app-proyecto-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './proyecto-list.component.html',
  styleUrl: './proyecto-list.component.css'
})
export class ProyectoListComponent implements OnInit {
  proyectos: ProyectoDTO[] = [];
  loading = false;
  error = false;
  loadingDelete: number | null = null;

  private proyectoService = inject(ProyectoService);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.loading = true;
    this.error = false;
    this.proyectoService.getProyectos().subscribe({
      next: (proyectos) => {
        this.proyectos = proyectos;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  recargar(): void {
    this.cargarProyectos();
  }

  eliminarProyecto(id: number): void {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
      this.loadingDelete = id;
      this.proyectoService.eliminarProyecto(id).subscribe({
        next: () => {
          this.proyectos = this.proyectos.filter(p => p.id !== id);
          this.snackBar.open('Proyecto eliminado', 'Cerrar', { duration: 2000 });
          this.loadingDelete = null;
        },
        error: () => {
          this.snackBar.open('Error al eliminar el proyecto', 'Cerrar', { duration: 3000 });
          this.loadingDelete = null;
        }
      });
    }
  }
}