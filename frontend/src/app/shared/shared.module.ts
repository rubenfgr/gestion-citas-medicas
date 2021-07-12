import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './../material/material.module';
import { ErrorComponent } from './pages/error/error.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [ErrorComponent, NavigationComponent],
  imports: [SharedRoutingModule, CommonModule, MaterialModule],
  exports: [ErrorComponent],
})
export class SharedModule {}
