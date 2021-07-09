import { classToPlain } from 'class-transformer';
import { cf } from './../../config/configuration';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './../users/users.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const bearerToken: string = req.headers['authorization'];
    const bearerTokenSplit = bearerToken.split(' ');
    if (bearerTokenSplit.length !== 2) {
      throw new UnauthorizedException();
    }
    const bearer = bearerTokenSplit[0];
    const token = bearerTokenSplit[1];
    if (bearer !== 'Bearer' || token.length === 0) {
      throw new UnauthorizedException();
    }
    const uid = this.validateToken(token);
    req.uid = uid;
    const { user } = await this.userService.findOne(uid);
    if (!user) {
      throw new UnauthorizedException();
    }
    req.user = user;

    return true;
  }

  private validateToken(token: string) {
    try {
      const jwtSecret = this.configService.get(cf.jwt.secret);
      const { uid } = this.jwtService.verify(token, { secret: jwtSecret });
      return uid;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
