import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { ClientComponent } from './pages/client/client.component';
import { ClientsHomeComponent } from './pages/clients-home/clients-home.component';
import { ClientCreateDialogComponent } from './components/client-create-dialog/client-create-dialog.component';

@NgModule({
  declarations: [
    ClientsListComponent,
    ClientComponent,
    ClientsHomeComponent,
    ClientCreateDialogComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ],
})
export class ClientsModule {}
