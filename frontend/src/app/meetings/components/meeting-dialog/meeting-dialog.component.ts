import { SwalIconType } from './../../../shared/enums/swal.enums';
import { AfterViewInit, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SweetAlertService } from './../../../shared/services/sweet-alert.service';
import { IMeeting } from './../../interfaces/meeting-res.interfaces';
import { MeetingsService } from './../../services/meetings.service';

@Component({
  selector: 'app-meeting-dialog',
  templateUrl: './meeting-dialog.component.html',
  styles: [],
})
export class MeetingDialogComponent implements AfterViewInit {
  meeting!: IMeeting;
  time = '00:00';
  examsDone = 0;

  constructor(
    public dialogRef: MatDialogRef<MeetingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMeeting,
    private meetingsService: MeetingsService,
    private sweetAlertService: SweetAlertService
  ) {}

  ngAfterViewInit(): void {
    this.meetingsService.findOneTree(this.data.id!).subscribe((res) => {
      this.meeting = { ...res.meeting };
      this.meeting.date = new Date(res.meeting.date);

      let hours = Math.abs(this.meeting.date.getHours()) - 2;
      // hours = hours === 0 ? hours : hours - 2;
      const min = this.meeting.date.getMinutes();
      this.time = `${hours < 9 ? '0' + hours : hours}:${
        min < 9 ? '0' + min : min
      }`;
      this.examsDone = this.meeting.examsDone;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    let [hours, min] = this.time.split(':');
    const date = new Date(this.meeting.date);
    date.setUTCHours(Number.parseInt(hours, 10), Number.parseInt(min, 10));
    this.meetingsService.confirm(this.meeting.id, date).subscribe((res) => {
      this.meeting.date = res.meeting.date;
      this.meeting.confirmed = res.meeting.confirmed;
      this.meeting.isActive = res.meeting.isActive;
      this.sweetAlertService.fire({
        confirmButtonText: 'Ok!',
        icon: SwalIconType.SUCCESS,
        text: `La cita se confirmó con éxito en la fecha: ${this.meeting.date}`,
        title: 'Correcto!',
      });
    });
  }

  finalize() {
    this.meetingsService
      .finalize(this.meeting.id, this.examsDone)
      .subscribe((res) => {
        this.meeting.examsDone = res.meeting.examsDone;
        this.meeting.isActive = res.meeting.isActive;
      });
  }
}
