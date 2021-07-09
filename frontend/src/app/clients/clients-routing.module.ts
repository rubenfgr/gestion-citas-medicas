import { ClientComponent } from './pages/client/client.component';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: ClientsListComponent },
      { path: 'client', component: ClientComponent },
      { path: '**', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
