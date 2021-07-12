import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsEnum } from 'class-validator';
import { Role } from '../role.enum';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password'] as const),
) {
  @IsEnum(Role, {
    message: `El rol debe ser uno de los siguientes valores: ${Object.values(
      Role,
    )}`,
  })
  role: Role;
}
