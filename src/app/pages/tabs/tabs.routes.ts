import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then( m => m.HomePage)
      },
      {
        path: 'users',
        loadComponent: () => import('./users/users.component').then( m => m.UsersComponent)
      },
      {
        path: 'travels',
        loadComponent: () => import('./travels/travels.component').then( m => m.TravelsComponent)
      },
      {
        path: 'account',
        loadComponent: () => import('./account/account.page').then( m => m.AccountPage)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },

];
