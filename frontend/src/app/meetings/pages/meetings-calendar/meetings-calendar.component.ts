import { MeetingsService } from './../../services/meetings.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-meetings-calendar',
  templateUrl: './meetings-calendar.component.html',
  styles: [],
})
export class MeetingsCalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: 'es',
    dateClick: this.handleDateClick.bind(this),
    eventClick: (info) => alert(JSON.stringify(info.event)),
    events: [{ date: new Date('2021-07-15'), title: 'Omg' }],
  };

  constructor() {}

  handleDateClick(arg: any) {
    console.log(arg.event.title);
    alert(JSON.stringify(arg));
  }

  ngOnInit(): void {}
}
