import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginatorDto } from '../shared/dto/paginator.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(
    @Query() paginatorDto: PaginatorDto,
    @Query('isActive') isActive: any,
  ) {
    isActive === 'true' || isActive === undefined || null
      ? (isActive = true)
      : (isActive = false);
    return this.usersService.findAll(paginatorDto, isActive);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('activate/:id')
  removeOrActivate(
    @Param('id', ParseIntPipe) id: number,
    @Query('isActive', ParseBoolPipe) isActive: boolean,
  ) {
    return this.usersService.removeOrActivate(id, isActive);
  }
}
