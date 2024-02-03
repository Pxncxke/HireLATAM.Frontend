import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/feature/home-shell/home-shell.routes')
      .then((r) => r.routes)
  }
];
