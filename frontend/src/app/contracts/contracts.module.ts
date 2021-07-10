import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsRoutingModule } from './contracts-routing.module';
import { ContractsListComponent } from './pages/contracts-list/contracts-list.component';
import { ContractsHomeComponent } from './pages/contracts-home/contracts-home.component';


@NgModule({
  declarations: [
    ContractsListComponent,
    ContractsHomeComponent
  ],
  imports: [
    CommonModule,
    ContractsRoutingModule
  ]
})
export class ContractsModule { }
