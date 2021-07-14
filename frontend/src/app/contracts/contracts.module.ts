import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsRoutingModule } from './contracts-routing.module';
import { ContractsListComponent } from './pages/contracts-list/contracts-list.component';
import { ContractsHomeComponent } from './pages/contracts-home/contracts-home.component';
import { ContractCreateDialogComponent } from './components/contract-create-dialog/contract-create-dialog.component';

@NgModule({
  declarations: [
    ContractsListComponent,
    ContractsHomeComponent,
    ContractCreateDialogComponent,
  ],
  imports: [
    CommonModule,
    ContractsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ContractsModule {}
