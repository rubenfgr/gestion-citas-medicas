import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingsRoutingModule } from './meetings-routing.module';
import { MeetingsCalendarComponent } from './pages/meetings-calendar/meetings-calendar.component';
import { MeetingsListComponent } from './pages/meetings-list/meetings-list.component';

@NgModule({
  declarations: [MeetingsCalendarComponent, MeetingsListComponent],
  imports: [CommonModule, MeetingsRoutingModule],
})
export class MeetingsModule {}
