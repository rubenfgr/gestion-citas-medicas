import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { ClientComponent } from './pages/client/client.component';
import { ClientsHomeComponent } from './pages/clients-home/clients-home.component';

@NgModule({
  declarations: [
    ClientsListComponent,
    ClientComponent,
    ClientsHomeComponent
  ],
  imports: [CommonModule, ClientsRoutingModule],
})
export class ClientsModule {}
