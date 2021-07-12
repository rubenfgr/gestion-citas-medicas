import {
  IsBooleanString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Role } from '../role.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: `El nombre de usuario es requerido` })
  username: string;

  @IsEmail({}, { message: `El email no es válido` })
  email: string;

  @IsNotEmpty({ message: `El password es requerido` })
  password: string;
}
