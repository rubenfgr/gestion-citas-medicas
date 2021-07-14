import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as ExcelJS from 'exceljs';
import { Readable } from 'stream';
import { Like, Repository } from 'typeorm';
import { UsersService } from './../users/users.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientsRepository: Repository<Client>,
    private usersService: UsersService,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const userExists = await this.clientsRepository.find({
      where: { user: { id: createClientDto.userId } },
    });
    if (userExists && userExists.length > 0) {
      throw new BadRequestException(
        `El usuario con id ${createClientDto.userId} ya esta asignado a un cliente`,
      );
    }
    const cifExists = await this.clientsRepository.find({
      where: { cif: createClientDto.cif },
    });
    if (cifExists && cifExists.length > 0) {
      throw new BadRequestException(`El cif ${createClientDto.cif} ya existe`);
    }
    const nameExists = await this.clientsRepository.find({
      where: { name: createClientDto.name },
    });
    if (nameExists && nameExists.length > 0) {
      throw new BadRequestException(
        `La razón social ${createClientDto.name} ya existe`,
      );
    }
    const { user } = await this.usersService.findOne(createClientDto.userId);

    const client = await this.clientsRepository.save({
      ...createClientDto,
      user,
    });

    return { ok: true, client };
  }

  async findAll(paginatorDto) {
    const clients = await this.clientsRepository.find({
      ...paginatorDto,
      join: { alias: 'client', leftJoinAndSelect: { user: 'client.user' } },
    });
    const total = await this.clientsRepository.count();
    return { ok: true, clients, total };
  }

  async findOne(id: number) {
    const client = await this.clientsRepository.findOne(id, {
      join: { alias: 'client', leftJoinAndSelect: { user: 'client.user' } },
    });
    if (!client) {
      throw new BadRequestException(
        `No existe ningún cliente con el identificador ${id}`,
      );
    }
    return { ok: true, client };
  }

  async findOneByUserId(userId: number) {
    const { user } = await this.usersService.findOne(userId);
    const client = await this.clientsRepository.findOne({
      where: { user: { id: userId } },
      // join: { alias: 'client', leftJoinAndSelect: { user: 'client.user' } },
    });
    if (!client) {
      throw new BadRequestException(
        `No existe ningún cliente para el usuario '${user.username}'. Contacte con el administrador para crear el perfil de cliente`,
      );
    }
    return { ok: true, client };
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    if (Object.keys(updateClientDto).length == 0) {
      throw new BadRequestException(
        `Al menos podrías mandar algun valor 'mendrugo'`,
      );
    }
    const client = await this.clientsRepository.findOne(id);
    if (!client) {
      throw new BadRequestException(
        `No existe ningún cliente con el identificador ${id}`,
      );
    }
    const cifExists = await this.clientsRepository.find({
      where: { cif: updateClientDto.cif },
    });
    if (cifExists && cifExists.length > 0 && cifExists[0].id !== id) {
      throw new BadRequestException(`El cif ${updateClientDto.cif} ya existe`);
    }
    const nameExists = await this.clientsRepository.find({
      where: { name: updateClientDto.name },
    });
    if (nameExists && nameExists.length > 0 && cifExists[0].id !== id) {
      throw new BadRequestException(
        `El nombre ${updateClientDto.name} ya existe`,
      );
    }
    const updateResult = await this.clientsRepository.update(
      { id },
      updateClientDto,
    );
    return { ok: updateResult.affected > 0 ? true : false };
  }

  async toExcel(term: string): Promise<Readable> {
    let clients: Client[] = [];

    clients = await this.clientsRepository.find();

    if (term !== '-') {
      clients = clients.filter((client) => {
        return (
          client.name
            .trim()
            .toLowerCase()
            .includes(term.trim().toLowerCase()) ||
          client.city.trim().toLowerCase().includes(term.trim().toLowerCase())
        );
      });
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('test');
    sheet.columns = [
      { header: 'CIF', key: 'cif' },
      { header: 'Razón Social', key: 'name' },
      { header: 'Dirección', key: 'address' },
      { header: 'Localidad', key: 'city' },
      { header: 'Provincia', key: 'province' },
    ];

    clients.forEach((client) => {
      sheet.addRow([
        client.cif,
        client.name,
        client.address,
        client.cif,
        client.province,
      ]);
    });

    const stream = new Readable();
    const buffer = await workbook.xlsx.writeBuffer();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }
}
