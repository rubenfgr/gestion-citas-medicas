import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { AuthService } from './../../../auth/services/auth.service';
import { ClientService } from './../../../clients/services/client.service';
import { DatesBetweenDto } from './../../../shared/interfaces/dates-between.dto';
import { Role } from './../../../users/users-roles-enum';
import { MeetingCreateDialogComponent } from './../../components/meeting-create-dialog/meeting-create-dialog.component';
import { MeetingDialogComponent } from './../../components/meeting-dialog/meeting-dialog.component';
import { IMeeting } from './../../interfaces/meeting-res.interfaces';
import { MeetingColor } from './../../meetings-colors.enum';
import { MeetingsService } from './../../services/meetings.service';

enum CalendarView {
  LIST = 'listMonth',
  GRID = 'dayGridMonth',
}
@Component({
  selector: 'app-meetings-calendar',
  templateUrl: './meetings-calendar.component.html',
  styleUrls: ['./meetings-calendar.component.scss'],
})
export class MeetingsCalendarComponent implements AfterViewInit {
  @ViewChild(FullCalendarComponent) calendarComponent!: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    plugins: [listPlugin, dayGridPlugin],
    initialView: CalendarView.GRID,
    views: { grid: {} },
    locale: 'es',
    dateClick: this.handleDayClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    datesSet: this.handleChange.bind(this),
  };

  loading = true;

  constructor(
    private meetingsService: MeetingsService,
    private authService: AuthService,
    private clientService: ClientService,
    private matDialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.adjustView();

    window.addEventListener('resize', (e) => {
      this.adjustView();
    });
  }

  adjustView(): void {
    if (window.innerWidth < 750) {
      this.calendarComponent?.getApi()?.changeView(CalendarView.LIST);
    } else {
      this.calendarComponent?.getApi()?.changeView(CalendarView.GRID);
    }
  }

  handleEventClick(arg: any) {
    const meetingId = arg.event._def.publicId;

    const user = this.authService.user;

    if (user?.role === Role.CLIENT) {
      this.openMeetingCreateDialog(meetingId);
    } else {
      this.openMeetingDialog(meetingId);
    }
  }

  openMeetingDialog(id: number) {
    this.matDialog
      .open(MeetingDialogComponent, {
        data: { id },
        disableClose: true,
      })
      .afterClosed()
      .subscribe((meeting) => {
        this.updateEvent(meeting);
      });
  }

  openMeetingCreateDialog(id: number) {
    this.matDialog
      .open(MeetingCreateDialogComponent, {
        data: { id, date: null },
      })
      .afterClosed()
      .subscribe((meeting) => {
        this.createEvent(meeting);
      });
  }

  private updateEvent(meeting: IMeeting) {
    if (this.calendarComponent && this.calendarComponent.getApi()) {
      const color = meeting.isActive
        ? meeting.confirmed
          ? MeetingColor.CONFIRMED
          : MeetingColor.UNCONFIRMED
        : MeetingColor.DEACTIVE;
      const event = this.calendarComponent
        .getApi()
        .getEventById(meeting.id.toString());
      if (event && meeting.contract.client) {
        event.setProp('title', meeting.contract.client.name);
        event.setProp('color', color);
      }
      this.calendarComponent.getApi().render();
    }
  }

  private createEvent(meeting: IMeeting) {
    if (
      meeting &&
      meeting.contract.client &&
      this.calendarComponent &&
      this.calendarComponent.getApi()
    ) {
      const color = meeting.isActive
        ? meeting.confirmed
          ? MeetingColor.CONFIRMED
          : MeetingColor.UNCONFIRMED
        : MeetingColor.DEACTIVE;
      this.calendarComponent.getApi().addEvent({
        id: meeting.id.toString(),
        title: meeting.contract.client.name,
        color,
      });
      this.calendarComponent.getApi().render();
    }
  }

  handleDayClick(arg: any) {
    this.matDialog.open(MeetingCreateDialogComponent, {
      data: { meeting: null, date: arg.date },
    });
  }

  month = -1;

  handleChange(arg: any) {
    const date = this.calendarComponent.getApi().getDate();
    const year = date.getFullYear();

    console.log(this.month, date.getMonth());

    if (this.month !== date.getMonth()) {
      this.month = date.getMonth();
      const beforeMonth = this.month == 1 ? 12 : this.month - 1;
      const daysBeforeMonth = new Date(year, beforeMonth, 0).getDate();
      const before = new Date(year, beforeMonth, daysBeforeMonth);
      const after = new Date(year, this.month + 1, 1);

      this.loadMeetings({ before, after });
    }
  }

  private loadMeetings(datesBetweenDto: DatesBetweenDto) {
    const user = this.authService.user;
    if (user && user.role === Role.CLIENT) {
      this.clientService.findOneByUserId(user.id).subscribe((res) => {
        this.loadMeetingByClientId(datesBetweenDto, res.client.id);
      });
    } else {
      this.loadMeetingAllTree(datesBetweenDto);
    }
  }

  private loadMeetingByClientId(
    datesBetweenDto: DatesBetweenDto,
    clientId: number
  ) {
    this.loading = true;
    this.meetingsService
      .findAllByClientIdDatesBetween(clientId, datesBetweenDto)
      .subscribe((res) => {
        this.pushEventsOnCalendar(res.meetings);
        this.loading = false;
      });
  }

  private loadMeetingAllTree(datesBetweenDto: DatesBetweenDto) {
    this.loading = true;
    this.meetingsService
      .findAllTreeDatesBetween(datesBetweenDto)
      .subscribe((res) => {
        this.pushEventsOnCalendar(res.meetings);
        this.loading = false;
      });
  }

  private pushEventsOnCalendar(meetings: IMeeting[]) {
    this.calendarComponent.getApi().removeAllEvents();

    meetings.forEach((meeting) => {
      const color = meeting.isActive
        ? meeting.confirmed
          ? MeetingColor.CONFIRMED
          : MeetingColor.UNCONFIRMED
        : MeetingColor.DEACTIVE;
      this.calendarComponent.getApi().addEvent({
        date: meeting.date,
        title: meeting.contract.client?.name,
        color,
        id: meeting.id.toString(),
      });
    });

    this.calendarComponent.getApi().render();
  }
}
