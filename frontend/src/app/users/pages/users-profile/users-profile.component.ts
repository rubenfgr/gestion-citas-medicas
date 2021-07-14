import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClient } from '../../../clients/interfaces/client-res.interfaces';
import { passwordVerify } from './../../../auth/pages/register/register.component';
import { AuthService } from './../../../auth/services/auth.service';
import { ClientService } from './../../../clients/services/client.service';
import { SwalIconType } from './../../../shared/enums/swal.enums';
import { SweetAlertService } from './../../../shared/services/sweet-alert.service';
import { IUser } from './../../interfaces/users-res.interfaces';
import { Role } from './../../users-roles-enum';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styles: [],
})
export class UsersProfileComponent implements OnInit {
  user: IUser | null = null;
  client: IClient | null = null;

  formPass: FormGroup = this.fb.group(
    {
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required]],
    },
    { validators: [passwordVerify] }
  );

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private swal: SweetAlertService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.user;
    if (this.user && this.user.role === Role.CLIENT) {
      this.clientService.findOneByUserId(this.user.id).subscribe((res) => {
        if (res && res.client) {
          this.client = res.client;
        }
      });
    }
  }

  save() {
    if (this.formPass.valid && this.user && this.user.id) {
      this.authService
        .changePass(this.user.id, this.formPass.get('password')?.value)
        .subscribe(() => {
          this.swal.fire({
            confirmButtonText: 'Ok!',
            icon: SwalIconType.SUCCESS,
            text: 'La contraseña se cambió con éxito',
            title: '',
          });
        });
    }
  }
}
