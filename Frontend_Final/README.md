# Frontend Final - Angular Task Management

## Overview

This Angular application implements a task management system with CRUD operations for projects and tasks, using Angular Material for UI components and Reactive Forms for form handling.

## Features

### Authentication
- Login page with reactive form validation
- Hardcoded credentials for testing: `admin@example.com` / `password123`
- Material Design UI components

### Project Management
- Create projects with name, description, and deadline
- Reactive form validation
- API integration via `ProyectoService`

### Task Management
- Create tasks with title, description, status, project association, and due date
- View tasks with filtering by status (pendiente, en_progreso, completada)
- Change task status with cycle button (pending → in progress → completed → pending)
- Visual status indicators with color coding

## Project Structure

```
src/app/
├── compoments/
│   └── login/
│       └── login.ts               # Login with hardcoded credentials
├── interfaces/
│   ├── proyecto.interface.ts  # ProyectoDTO, ProyectosResponse
│   └── tarea.interface.ts     # TareaDTO, TareasResponse, EstadoTarea
├── services/
│   ├── proyecto.service.ts        # CRUD operations for proyectos API
│   └── tarea.service.ts           # CRUD operations for tareas API
├── components/
│   ├── proyecto/
│   │   ├── proyecto-create.component.ts
│   │   ├── proyecto-create.component.html
│   │   ├── proyecto-create.component.css
│   │   ├── proyecto-list.component.ts
│   │   ├── proyecto-list.component.html
│   │   └── proyecto-list.component.css
│   ├── tarea/
│   │   ├── tarea-create.component.ts
│   │   ├── tarea-create.component.html
│   │   └── tarea-create.component.css
│   └── tarea-list/
│       ├── tarea-list.component.ts
│       ├── tarea-list.component.html
│       └── tarea-list.component.css
└── app.routes.ts                  # Route definitions
```

## Interfaces (DTOs)

### ProyectoDTO
```typescript
interface ProyectoDTO {
  id?: number;
  nombre: string;
  descripcion?: string | null;
  fecha_limite?: Date | null;
}

interface ProyectosResponse {
  proyectos: ProyectoDTO[];
}

interface ProyectoPorIdResponse extends ProyectoDTO {}
```

### TareaDTO
```typescript
enum EstadoTarea {
  PENDIENTE = 'pendiente';
  EN_PROGRESO = 'en_progreso';
  COMPLETADA = 'completada';
}

interface TareaDTO {
  id?: number;
  titulo: string;
  descripcion?: string | null;
  estado: EstadoTarea;
  id_proyecto: number;
  fecha_vencimiento?: Date | null;
}

interface TareasResponse {
  tareas: TareaDTO[];
}

interface TareaPorIdResponse extends TareaDTO {}
```

## Services

Both services use `HttpClient` with RxJS Observables for API communication:

- `ProyectoService`: `getProyectos()`, `getProyecto(id)`, `crearProyecto()`, `actualizarProyecto()`, `eliminarProyecto()`
- `TareaService`: `getTareas()`, `getTareasPorEstado()`, `getTareasPorProyecto()`, `crearTarea()`, `cambiarEstado()`, `eliminarTarea()`

## Routes

| Path | Component |
|------|-----------|
| `/login` | Login |
| `/proyectos` | ProyectoListComponent |
| `/proyectos/crear` | ProyectoCreateComponent |
| `/tareas` | TareaListComponent |
| `/tareas/crear` | TareaCreateComponent |

## API Configuration

Base URL: `http://localhost:3000/api` (configured in `environment.ts`)

Expected endpoints:
- `GET/POST/PUT/DELETE /api/proyectos`
- `GET/POST/PUT/DELETE/PATCH /api/tareas`