import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsRoutingModule } from './contracts-routing.module';
import { ContractsListComponent } from './pages/contracts-list/contracts-list.component';


@NgModule({
  declarations: [
    ContractsListComponent
  ],
  imports: [
    CommonModule,
    ContractsRoutingModule
  ]
})
export class ContractsModule { }
