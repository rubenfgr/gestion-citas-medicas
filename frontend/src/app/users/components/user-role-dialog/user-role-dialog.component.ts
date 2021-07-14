import { SwalIconType } from './../../../shared/enums/swal.enums';
import { SweetAlertService } from './../../../shared/services/sweet-alert.service';
import { UserService } from './../../services/user.service';
import { IUser } from './../../interfaces/users-res.interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Role } from '../../users-roles-enum';

@Component({
  selector: 'app-user-role-dialog',
  templateUrl: './user-role-dialog.component.html',
  styles: [],
})
export class UserRoleDialogComponent implements OnInit {
  role!: Role;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private matDialogRef: MatDialogRef<UserRoleDialogComponent>,
    private userService: UserService,
    private swal: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.role = this.data.role;
  }

  save() {
    this.userService.changeRole(this.data.id, this.role).subscribe((res) => {
      this.swal.fire({
        confirmButtonText: 'Ok!',
        icon: SwalIconType.SUCCESS,
        text: 'El Rol se modificó con éxito',
        title: '',
      });
      this.data.role = this.role;
      this.matDialogRef.close(this.data);
    });
  }
}
