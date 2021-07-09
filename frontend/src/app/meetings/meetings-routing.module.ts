import { MeetingsListComponent } from './pages/meetings-list/meetings-list.component';
import { MeetingsCalendarComponent } from './pages/meetings-calendar/meetings-calendar.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'calendar', component: MeetingsCalendarComponent },
      { path: 'list', component: MeetingsListComponent },
      { path: '**', redirectTo: 'calendar' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingsRoutingModule {}
