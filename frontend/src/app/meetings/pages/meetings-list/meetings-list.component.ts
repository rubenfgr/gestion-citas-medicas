import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Role } from '../../../users/users-roles-enum';
import { MeetingCreateDialogComponent } from '../../components/meeting-create-dialog/meeting-create-dialog.component';
import { AuthService } from './../../../auth/services/auth.service';
import { ClientService } from './../../../clients/services/client.service';
import { MeetingDialogComponent } from './../../components/meeting-dialog/meeting-dialog.component';
import { IMeeting } from './../../interfaces/meeting-res.interfaces';
import { MeetingsService } from './../../services/meetings.service';
import * as moment from 'moment';
@Component({
  selector: 'app-meetings-list',
  templateUrl: './meetings-list.component.html',
  styles: [
    `
      .mat-row {
        cursor: pointer;
      }

      .mat-row:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class MeetingsListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'client',
    'date',
    'examsRequired',
    'examsDone',
    'confirmed',
  ];
  dataSource = new MatTableDataSource<IMeeting>();
  meetings: IMeeting[] = [];

  pageEvent!: PageEvent;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatTable) table!: MatTable<IMeeting>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private meetingsService: MeetingsService,
    private matDialog: MatDialog,
    private authService: AuthService,
    private clientService: ClientService
  ) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.loadMeetings();
  }

  pageChange(event: PageEvent) {
    this.loadMeetings();
    return event;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.data = this.meetings.filter((meeting) => {
      let { contract, date, ...rest } = meeting;
      const { client } = contract;
      const { name } = client;
      const dateS = moment(date).utc().format('DD/MM/Y HH:mm:ss');
      const meetingString = Object.values({
        dateS,
        ...rest,
        name,
      })
        .join('')
        .toLowerCase();
      console.log(meetingString);
      return meetingString.includes(filterValue);
    });
  }

  openDialog(meeting: IMeeting) {
    const user = this.authService.user;

    if (user?.role === Role.CLIENT) {
      this.openMeetingCreateDialog(meeting.id);
    } else {
      this.openMeetingDialog(meeting.id);
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
        const index = this.meetings.findIndex((m) => m.id === meeting?.id);
        if (index >= 0) {
          this.meetings[index] = meeting;
          this.dataSource.data = this.meetings;
        }
      });
  }

  openMeetingCreateDialog(id: number) {
    this.matDialog
      .open(MeetingCreateDialogComponent, {
        data: { id, date: null },
      })
      .afterClosed()
      .subscribe((meeting) => {
        const index = this.meetings.findIndex((m) => m.id === meeting?.id);
        if (index >= 0) {
          this.meetings[index] = meeting;
          this.dataSource.data = this.meetings;
        }
      });
  }

  // ==================================================
  //  Private
  // ==================================================

  private loadMeetings() {
    const pageSize = this.paginator.pageSize;
    const pageIndex = this.paginator.pageIndex;
    const user = this.authService.user;

    if (user) {
      if (user.role === Role.CLIENT) {
        this.clientService
          .findOneByUserId(user.id)
          .pipe(
            switchMap((res: any) => {
              return this.meetingsService.findAllByClientId(res.client.id, {
                skip: pageIndex * this.paginator.pageSize,
                take: pageSize,
              });
            })
          )
          .subscribe((res) => {
            this.length = res.total;
            this.dataSource.data = res.meetings;
            this.meetings = res.meetings;
          });
      } else {
        this.meetingsService
          .findAllTree({
            skip: pageIndex * this.paginator.pageSize,
            take: pageSize,
          })
          .subscribe((res) => {
            this.length = res.total;
            this.dataSource.data = res.meetings;
            this.meetings = res.meetings;
          });
      }
    }
  }
}
