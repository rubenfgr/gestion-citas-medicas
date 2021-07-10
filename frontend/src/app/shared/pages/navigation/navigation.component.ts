import { IRoute } from './../../interfaces/route.interface';
import { NavigationService } from './../../services/navigation.service';
import { IUser } from './../../../users/interfaces/users.interfaces';
import { AuthService } from './../../../auth/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styles: [
    `
      .sidenav-container {
        height: 100%;
      }

      .sidenav {
        width: 200px;
      }

      .sidenav .mat-toolbar {
        background: inherit;
      }

      .mat-toolbar.mat-primary {
        position: sticky;
        top: 0;
        z-index: 1;
      }
      .text-username {
        color: rgba(0, 255, 0, 0.8);
      }
    `,
  ],
})
export class NavigationComponent {
  title = 'Gestión de citas médicas';
  user: IUser | null = null;
  routes: IRoute[] = [];

  constructor(
    private authService: AuthService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.user;

    this.navigationService
      .getRoutes()
      .subscribe((routes) => (this.routes = routes));
  }
}
