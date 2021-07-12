import { MeetingsOneComponent } from './pages/meetings-one/meetings-one.component';
import { MeetingsHomeComponent } from './pages/meetings-home/meetings-home.component';
import { MeetingsListComponent } from './pages/meetings-list/meetings-list.component';
import { MeetingsCalendarComponent } from './pages/meetings-calendar/meetings-calendar.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MeetingsHomeComponent,
    children: [
      { path: 'calendar', component: MeetingsCalendarComponent },
      { path: 'list', component: MeetingsListComponent },
      { path: 'one', component: MeetingsOneComponent },
      { path: '**', redirectTo: 'calendar' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingsRoutingModule {}
