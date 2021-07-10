import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './../material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ErrorComponent } from './pages/error/error.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
  ],
  imports: [SharedRoutingModule, CommonModule, MaterialModule],
  exports: [ErrorComponent, HeaderComponent, FooterComponent],
})
export class SharedModule {}
