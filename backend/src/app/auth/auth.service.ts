import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login() {
    return 'login service';
  }

  logout() {
    return 'logout service';
  }

  register() {
    return 'register service';
  }
}
