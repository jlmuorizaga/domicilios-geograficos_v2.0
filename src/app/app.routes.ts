import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.page').then( m => m.MenuPage)
  },
  {
    path: 'capturar',
    loadComponent: () => import('./pages/capturar/capturar.page').then( m => m.CapturarPage)
  },
  {
    path: 'editar',
    loadComponent: () => import('./pages/editar/editar.page').then( m => m.EditarPage)
  },
  {
    path: 'exportar',
    loadComponent: () => import('./pages/exportar/exportar.page').then( m => m.ExportarPage)
  },
];
