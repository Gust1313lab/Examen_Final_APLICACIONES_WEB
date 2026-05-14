import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { TareaService } from '../../services/tarea.service';
import { ProyectoService } from '../../services/proyecto.service';
import { Router } from '@angular/router';
import { ProyectoDTO } from '../../interfaces/proyecto.interface';
import { EstadoTarea } from '../../interfaces/tarea.interface';

@Component({
  selector: 'app-tarea-create',
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
    MatSnackBarModule,
    MatSelectModule
  ],
  templateUrl: './tarea-create.component.html',
  styleUrl: './tarea-create.component.css'
})
export class TareaCreateComponent implements OnInit {
  tareaForm: FormGroup;
  loading = false;
  proyectos: ProyectoDTO[] = [];
  estados = Object.values(EstadoTarea);

  private fb = inject(FormBuilder);
  private tareaService = inject(TareaService);
  private proyectoService = inject(ProyectoService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  ngOnInit(): void {
    this.proyectoService.getProyectos().subscribe({
      next: (proyectos) => this.proyectos = proyectos
    });
  }

  constructor() {
    this.tareaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: [''],
      estado: [EstadoTarea.PENDIENTE, Validators.required],
      id_proyecto: [null, Validators.required],
      fecha_vencimiento: [null]
    });
  }

  onSubmit(): void {
    if (this.tareaForm.invalid) {
      return;
    }

    this.loading = true;
    this.tareaService.crearTarea(this.tareaForm.value).subscribe({
      next: () => {
        this.snackBar.open('Tarea creada correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/tareas']);
      },
      error: () => {
        this.snackBar.open('Error al crear la tarea', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }
}
