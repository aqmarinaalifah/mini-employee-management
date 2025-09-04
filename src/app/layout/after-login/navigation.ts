import { MenuItem } from 'primeng/api';

export const navigationData: MenuItem[] = [
  {
    label: 'Employee List',
    icon: 'pi pi-users',
    routerLink: '/employee-list',
  },
  {
    label: 'Add Employee',
    icon: 'pi pi-user-plus',
    routerLink: '/add-employee',
  },
];
