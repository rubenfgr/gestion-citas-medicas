import { ContractsHomeComponent } from './pages/contracts-home/contracts-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractsListComponent } from './pages/contracts-list/contracts-list.component';

const routes: Routes = [
  {
    path: '',
    component: ContractsHomeComponent,
    children: [
      { path: 'list', component: ContractsListComponent },
      { path: '**', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractsRoutingModule {}
