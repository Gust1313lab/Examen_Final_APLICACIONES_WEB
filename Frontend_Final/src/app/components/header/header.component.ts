import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  template: `
    <mat-toolbar color="primary">
      <span class="app-title">Gestor de Tareas</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/proyectos" routerLinkActive="active">
        <mat-icon>folder</mat-icon>
        Proyectos
      </button>
      <button mat-button routerLink="/tareas" routerLinkActive="active">
        <mat-icon>task</mat-icon>
        Tareas
      </button>
      <button mat-button routerLink="/tareas/crear" routerLinkActive="active">
        <mat-icon>add</mat-icon>
        Nueva Tarea
      </button>
      <button mat-button routerLink="/proyectos/crear" routerLinkActive="active">
        <mat-icon>add_circle</mat-icon>
        Nuevo Proyecto
      </button>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .app-title {
      font-weight: 500;
    }
    .active {
      background-color: rgba(255, 255, 255, 0.1);
    }
  `]
})
export class HeaderComponent {
  private router = inject(Router);
}