import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { ClientComponent } from './pages/client/client.component';

@NgModule({
  declarations: [
    ClientsListComponent,
    ClientComponent
  ],
  imports: [CommonModule, ClientsRoutingModule],
})
export class ClientsModule {}
