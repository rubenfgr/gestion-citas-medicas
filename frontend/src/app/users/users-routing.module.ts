import { UsersListComponent } from './pages/users-list/users-list.component';
import { UsersHomeComponent } from './pages/users-home/users-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UsersHomeComponent,
    children: [
      {
        path: 'list',
        component: UsersListComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
