import { Role } from './role.enum';
import { PaginatorDto } from './../shared/dto/paginator.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const emailExists = await this.usersRepository.find({
      where: { email: createUserDto.email },
    });
    if (emailExists && emailExists.length > 0) {
      throw new BadRequestException(`El email ya existe`);
    }
    const userNameExists = await this.usersRepository.find({
      where: { username: createUserDto.username },
    });
    if (userNameExists && userNameExists.length > 0) {
      throw new BadRequestException(`El nombre de usuario ya existe`);
    }
    let user = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = Role.CLIENT;
    user = await this.usersRepository.save(user);
    const plainUser = classToClass(user);
    return { ok: true, user: plainUser };
  }

  async findAll(paginatorDto: PaginatorDto) {
    const users = await this.usersRepository.find({
      ...paginatorDto,
    });
    const total = await this.usersRepository.count();
    const actived = await this.usersRepository.count({
      where: { isActive: true },
    });
    const deactived = await this.usersRepository.count({
      where: { isActive: false },
    });
    const usersMapped = users.map((user) => classToClass(user));
    return { ok: true, users: usersMapped, total, actived, deactived };
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new BadRequestException(
        `No existe ningún usuario con el identificador ${id}`,
      );
    }
    const userMapped = classToClass(user);
    return { ok: true, user: userMapped };
  }

  async findOneByUsername(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new BadRequestException(
        `No existe ningún usuario con el nombre ${username}`,
      );
    }
    return { ok: true, user };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new BadRequestException(
        `No existe ningún usuario con el identificador ${id}`,
      );
    }
    const { role, ...rest } = updateUserDto;
    const updateResult = await this.usersRepository.update({ id }, rest);
    return { ok: updateResult.affected > 0 ? true : false };
  }

  async changeRole(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new BadRequestException(
        `No existe ningún usuario con el identificador ${id}`,
      );
    }
    const updateResult = await this.usersRepository.update(
      { id },
      { role: updateUserDto.role },
    );
    return { ok: updateResult.affected > 0 ? true : false };
  }

  async removeOrActivate(id: number, isActive: boolean) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new BadRequestException(
        `No existe ningún usuario con el identificador ${id}`,
      );
    }
    const updateResult = await this.usersRepository.update(
      { id },
      { isActive },
    );
    return { ok: updateResult.affected > 0 ? true : false };
  }
}
