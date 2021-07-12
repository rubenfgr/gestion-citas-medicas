import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MeetingsOneComponent } from './pages/meetings-one/meetings-one.component';
import { MeetingDialogComponent } from './components/meeting-dialog/meeting-dialog.component';
import { MeetingCreateDialogComponent } from './components/meeting-create-dialog/meeting-create-dialog.component';

FullCalendarModule.registerPlugins([dayGridPlugin, interactionPlugin]);

@NgModule({
  declarations: [
    MeetingsCalendarComponent,
    MeetingsListComponent,
    MeetingsHomeComponent,
    MeetingsOneComponent,
    MeetingDialogComponent,
    MeetingCreateDialogComponent,
  ],
  imports: [
    CommonModule,
    MeetingsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    MaterialModule,
  ],
})
export class MeetingsModule {}
