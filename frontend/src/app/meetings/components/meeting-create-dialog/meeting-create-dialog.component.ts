import { SwalIconType } from './../../../shared/enums/swal.enums';
import { SweetAlertService } from './../../../shared/services/sweet-alert.service';
import { CreateMeetingDto } from './../../interfaces/meeting.interfaces';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './../../../auth/services/auth.service';
import { ClientService } from './../../../clients/services/client.service';
import { ContractService } from './../../../contracts/services/contract.service';
import { IMeeting } from './../../interfaces/meeting-res.interfaces';
import { MeetingsService } from './../../services/meetings.service';

@Component({
  selector: 'app-meeting-create-dialog',
  templateUrl: './meeting-create-dialog.component.html',
  styles: [],
})
export class MeetingCreateDialogComponent implements OnInit {
  meeting!: IMeeting;
  title = '';

  myForm: FormGroup = this.fb.group({
    examsRequired: [0, [Validators.required]],
    date: ['', [Validators.required]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { id: number | undefined; date: Date | undefined },
    private dialogRef: MatDialogRef<MeetingCreateDialogComponent>,
    private meetinsService: MeetingsService,
    private contractService: ContractService,
    private authService: AuthService,
    private clientService: ClientService,
    private sweetAlertService: SweetAlertService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.data.id) {
      this.update();
    } else {
      this.create();
    }
  }

  update() {
    this.title = 'Actualizar cita';
    if (this.data.id) {
      this.meetinsService.findOneTree(this.data.id).subscribe((res) => {
        this.meeting = res.meeting;
        this.myForm.reset({
          date: this.meeting.date,
          examsRequired: this.meeting.examsRequired,
        });
      });
    }
  }

  create() {
    this.title = 'Crear nueva cita';
    const user = this.authService.user;
    if (user && user.id) {
      this.clientService
        .findOneByUserId(user.id)
        .pipe(
          switchMap((clientRes) => {
            return this.contractService.findOneByClientId(clientRes.client.id);
          })
        )
        .subscribe((contractRes) => {
          if (!contractRes || contractRes.contracts.length === 0) {
            this.dialogRef.close();
            throw new Error(`No puede crear citas sin un contrato en vigor`);
          }
          this.meeting = {
            contract: contractRes.contracts[0],
            date: this.data.date!,
            confirmed: false,
            examsDone: 0,
            examsRequired: 0,
            id: 0,
            isActive: true,
          };
          this.myForm.reset({
            date: this.meeting.date,
            examsRequired: this.meeting.examsRequired,
          });
        });
    }
  }

  save() {
    const createMeetingDto: CreateMeetingDto = {
      contractId: this.meeting.contract?.id,
      date: this.myForm.controls.date.value,
      examsRequired: this.myForm.controls.examsRequired.value,
    };

    if (this.data.id) {
      this.meetinsService
        .update(this.data.id, createMeetingDto)
        .subscribe((res) => {
          this.meeting.examsRequired = this.myForm.controls.examsRequired.value;
          this.sweetAlertService.fire({
            confirmButtonText: 'Ok!',
            icon: SwalIconType.SUCCESS,
            text: 'La cita se actualizó con éxito',
            title: 'Completado!',
          });
          this.dialogRef.close(this.meeting);
        });
    } else {
      this.meetinsService.create(createMeetingDto).subscribe((res) => {
        this.sweetAlertService.fire({
          confirmButtonText: 'Ok!',
          icon: SwalIconType.SUCCESS,
          text: 'La cita se creó con éxito',
          title: 'Completado!',
        });
        this.dialogRef.close({ meeting: res.meeting });
      });
    }
  }
}
