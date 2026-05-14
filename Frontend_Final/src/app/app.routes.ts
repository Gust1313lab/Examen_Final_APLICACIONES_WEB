import { Routes } from '@angular/router';
import { Login } from './compoments/login/login';
import { ProyectoCreateComponent } from './components/proyecto/proyecto-create.component';
import { ProyectoListComponent } from './components/proyecto/proyecto-list.component';
import { TareaCreateComponent } from './components/tarea/tarea-create.component';
import { TareaListComponent } from './components/tarea-list/tarea-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'proyectos',
    component: ProyectoListComponent
  },
  {
    path: 'proyectos/crear',
    component: ProyectoCreateComponent
  },
  {
    path: 'tareas',
    component: TareaListComponent
  },
  {
    path: 'tareas/crear',
    component: TareaCreateComponent
  }
];
