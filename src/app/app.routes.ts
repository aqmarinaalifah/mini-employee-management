import { Route, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'login',
        loadChildren: () => import('./modules/auth/login/login.routes'),
      },
    ],
  },

  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'after-login',
    },
    children: [
      {
        path: 'employee-list',
        loadChildren: () =>
          import('./modules/employee-list/employee-list.routes'),
      },
      {
        path: 'add-employee',
        loadChildren: () =>
          import('./modules/add-employee/add-employee.routes'),
      },
      {
        path: 'employee-detail',
        loadChildren: () =>
          import('./modules/employee-detail/employee-detail.routes'),
      },
    ],
  },
];
