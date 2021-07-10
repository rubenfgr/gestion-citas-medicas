import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingsRoutingModule } from './meetings-routing.module';
import { MeetingsCalendarComponent } from './pages/meetings-calendar/meetings-calendar.component';
import { MeetingsListComponent } from './pages/meetings-list/meetings-list.component';

// Full Calendar
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MeetingsHomeComponent } from './pages/meetings-home/meetings-home.component';

FullCalendarModule.registerPlugins([dayGridPlugin, interactionPlugin]);

@NgModule({
  declarations: [MeetingsCalendarComponent, MeetingsListComponent, MeetingsHomeComponent],
  imports: [CommonModule, MeetingsRoutingModule, FullCalendarModule, MaterialModule],
})
export class MeetingsModule {}
