import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { ErrorComponent } from './shared/pages/error/error.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'nav',
        loadChildren: () =>
          import('./shared/shared.module').then((m) => m.SharedModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: '404',
        component: ErrorComponent,
      },
      {
        path: '**',
        redirectTo: 'nav',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
