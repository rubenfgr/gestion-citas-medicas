import { SwalIconType } from './../../../shared/enums/swal.enums';
import { SweetAlertService } from './../../../shared/services/sweet-alert.service';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sweetAlertService: SweetAlertService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService.login(username, password).subscribe(() => {
        this.sweetAlertService.fire({
          confirmButtonText: 'Ok!',
          icon: SwalIconType.SUCCESS,
          text: 'Se ha identificado con éxito',
          title: '',
        });
        this.router.navigate(['nav']);
      });
    }
  }
}
