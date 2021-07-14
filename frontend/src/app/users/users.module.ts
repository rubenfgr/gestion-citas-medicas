import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UsersHomeComponent } from './pages/users-home/users-home.component';
import { UserRoleDialogComponent } from './components/user-role-dialog/user-role-dialog.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';

@NgModule({
  declarations: [
    UsersListComponent,
    UsersHomeComponent,
    UserRoleDialogComponent,
    UsersProfileComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UsersModule {}
