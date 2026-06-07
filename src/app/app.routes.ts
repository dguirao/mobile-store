import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    data: { breadcrumb: 'Productos' },
    loadComponent: () =>
      import('./components/product-list/product-list.component').then(
        m => m.ProductListComponent
      )
  },
  {
    path: 'product/:id',
    data: { breadcrumb: 'Detalle' },
    loadComponent: () =>
      import('./components/product-detail/product-detail.component').then(
        m => m.ProductDetailComponent
      )
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];