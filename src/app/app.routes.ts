import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'produtos',
    loadComponent: () => import('./pages/produtos/products.component').then((m) => m.ProductsComponent),
  },
  {
    path: 'revendas',
    loadComponent: () => import('./pages/revendas/resellers.component').then((m) => m.ResellersComponent),
  },
  {
    path: 'contato',
    loadComponent: () => import('./pages/contato/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: 'pedido',
    redirectTo: 'contato',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
