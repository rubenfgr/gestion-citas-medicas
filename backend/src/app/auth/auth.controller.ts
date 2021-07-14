import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Role } from './../users/role.enum';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('change-pass/:id')
  changePass(
    @Param('id', ParseIntPipe) id: number,
    @Body('password') password: string,
  ) {
    return this.authService.changePass(id, password);
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('renew')
  renew(@Request() req) {
    return this.authService.renew(req.user);
  }

  @Roles(Role.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  profile(@Request() req) {
    return req.user;
  }
}
