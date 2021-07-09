import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './../material/material.module';
import { ErrorComponent } from './pages/error/error.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [ErrorComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ErrorComponent, HeaderComponent, FooterComponent],
})
export class SharedModule {}
