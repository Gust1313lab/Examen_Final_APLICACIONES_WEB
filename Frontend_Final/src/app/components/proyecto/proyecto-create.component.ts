import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ProyectoService } from '../../services/proyecto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proyecto-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './proyecto-create.component.html',
  styleUrl: './proyecto-create.component.css'
})
export class ProyectoCreateComponent {
  proyectoForm: FormGroup;
  loading = false;

  private fb = inject(FormBuilder);
  private proyectoService = inject(ProyectoService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  constructor() {
    this.proyectoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: [''],
      fecha_limite: [null]
    });
  }

  onSubmit(): void {
    if (this.proyectoForm.invalid) {
      return;
    }

    this.loading = true;
    this.proyectoService.crearProyecto(this.proyectoForm.value).subscribe({
      next: () => {
        this.snackBar.open('Proyecto creado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/tareas']);
      },
      error: () => {
        this.snackBar.open('Error al crear el proyecto', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }
}