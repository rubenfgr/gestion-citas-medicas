import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwalIconType } from '../../../shared/enums/swal.enums';
import { SweetAlertService } from '../../../shared/services/sweet-alert.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent {
  registerForm: FormGroup = this.fb.group(
    {
      username: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required]],
    },
    { validators: passwordVerify }
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sweetAlertService: SweetAlertService,
    private router: Router
  ) {}

  register() {
    if (this.registerForm.valid) {
      const username = this.registerForm.get('username')?.value;
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;

      this.authService.register({ username, email, password }).subscribe(() => {
        this.sweetAlertService.fire({
          confirmButtonText: 'Ok!',
          icon: SwalIconType.SUCCESS,
          text: 'Se ha registrado con éxito',
          title: '',
        });
        this.router.navigate(['auth']);
      });
    }
  }

  formError(errorName: string) {
    console.log(this.registerForm.getError(errorName));
    return true;
  }
}

export const passwordVerify: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const passwordRepeat = control.get('passwordRepeat')?.value;

  return password && passwordRepeat && password !== passwordRepeat
    ? { notEquals: 'Las contraseñas no coinciden' }
    : null;
};
