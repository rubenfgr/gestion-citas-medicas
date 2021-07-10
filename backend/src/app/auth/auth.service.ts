import { CreateUserDto } from './../users/dto/create-user.dto';
import { User } from './../users/entities/user.entity';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const { user } = await this.usersService.findOneByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { uid: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  renew(user: User) {
    const access_token = this.jwtService.sign({ uid: user.id });
    return {
      access_token,
      user,
    };
  }

  register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
