import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';
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
    user.role = createUserDto.role;
    user = await this.usersRepository.save(user);
    const plainUser = classToPlain(user);
    return { ok: true, user: plainUser };
  }

  async findAll() {
    const users = await this.usersRepository.find();
    const usersMapped = users.map((user) => classToPlain(user));
    return { ok: true, users: usersMapped };
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new BadRequestException(
        `No existe ningún usuario con el identificador ${id}`,
      );
    }
    const userMapped = classToPlain(user);
    return { ok: true, user: userMapped };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new BadRequestException(
        `No existe ningún usuario con el identificador ${id}`,
      );
    }
    const updateResult = await this.usersRepository.update(
      { id },
      updateUserDto,
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
