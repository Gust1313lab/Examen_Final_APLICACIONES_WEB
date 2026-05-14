import { Routes } from '@angular/router';
import { Login } from './compoments/login/login';
import { CatalogoComponent } from './compoments/catalogo/catalogo';
import { MisReservasComponent } from './compoments/mis-reservas/mis-reservas';

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
    path: 'catalogo',
    component: CatalogoComponent
  },
  {
    path: 'mis-reservas',
    component: MisReservasComponent
  },
  {
    path: 'home',
    redirectTo: 'catalogo',
    pathMatch: 'full'
  }
];
