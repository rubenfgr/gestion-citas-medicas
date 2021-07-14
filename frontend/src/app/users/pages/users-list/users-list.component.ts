import { SwalIconType } from './../../../shared/enums/swal.enums';
import { SweetAlertService } from './../../../shared/services/sweet-alert.service';
import { UserRoleDialogComponent } from './../../components/user-role-dialog/user-role-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from './../../interfaces/users-res.interfaces';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styles: [],
})
export class UsersListComponent implements OnInit {
  users: IUser[] = [];
  usersSource: IUser[] = [];
  term = '';

  constructor(
    private userService: UserService,
    private matDialog: MatDialog,
    private swal: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.userService.findAll().subscribe((res) => {
      if (res && res.users) {
        this.usersSource = res.users;
        this.users = this.usersSource;
      }
    });
  }

  filter() {
    this.users = this.usersSource.filter((user) => {
      return Object.values(user)
        .join('')
        .trim()
        .toLowerCase()
        .includes(this.term.trim().toLowerCase());
    });
  }

  activateOrDeactivate(user: IUser) {
    if (user) {
      this.userService
        .removeOrActivate(user.id, user.isActive ? false : true)
        .subscribe(() => {
          let index = this.usersSource.findIndex((u) => u.id === user.id);
          this.usersSource[index].isActive = !user.isActive;
          this.filter();
          this.swal.fire({
            confirmButtonText: 'Ok!',
            icon: SwalIconType.SUCCESS,
            text: !user.isActive
              ? 'El usuario se dió de baja correctamente'
              : 'El usuario se dió de alta correctamente',
            title: '',
          });
        });
    }
  }

  changeRole(user: IUser) {
    this.matDialog
      .open(UserRoleDialogComponent, { data: user })
      .afterClosed()
      .subscribe((user) => {
        if (user && user.id) {
          let index = this.usersSource.findIndex((u) => u.id === user.id);
          this.usersSource[index] = user;
          index = this.users.findIndex((u) => u.id === user.id);
          this.users[index] = user;

        }
      });
  }
}
