import { AuthService } from './../../auth/services/auth.service';
import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Role } from '../../users/users-roles-enum';

@Directive({
  selector: '[appRole]',
})
export class RoleDirective implements OnInit {
  @Input() appRole!: Role[];

  constructor(private elementRef: ElementRef, private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.user;
    if (this.appRole.includes(user.role)) {
      this.elementRef.nativeElement.hidden = false;
    } else {
      this.elementRef.nativeElement.hidden = true;
    }
  }
}
