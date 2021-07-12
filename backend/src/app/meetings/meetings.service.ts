import { join } from 'path';
import { BadRequestException, Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { ClientsService } from './../clients/clients.service';
import { ContractsService } from './../contracts/contracts.service';
import { DatesBetweenDto } from './../shared/dto/dates-between.dto';
import { PaginatorDto } from './../shared/dto/paginator.dto';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { Meeting } from './entities/meeting.entity';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting) private meetingsRepository: Repository<Meeting>,
    private contractService: ContractsService,
    private clientsService: ClientsService,
  ) {}

  async create(createMeetingDto: CreateMeetingDto) {
    const date = new Date(createMeetingDto.date);
    await this.checkDate(date);
    date.setHours(0, 0, 0, 0);
    const { contract } = await this.contractService.findOne(
      createMeetingDto.contractId,
    );
    if (!contract.isActive) {
      throw new BadRequestException(
        `Para realizar la cita necesita un contrato activo`,
      );
    }
    const examsAvailable = contract.exams - contract.examsDone;
    if (createMeetingDto.examsRequired > examsAvailable) {
      throw new BadRequestException(
        `La cantidad de reconocimientos solicitados excede la cantidad disponible por contrato: ${examsAvailable}`,
      );
    }

    let meeting = new Meeting();
    meeting.contract = contract;
    meeting.date = date;
    meeting.examsRequired = createMeetingDto.examsRequired;
    meeting = await this.meetingsRepository.save(meeting);
    return { ok: true, meeting };
  }

  async findAll(paginatorDto: PaginatorDto) {
    const meetings = await this.meetingsRepository.find({
      ...paginatorDto,
      order: { date: 'ASC' },
    });
    const actived = await this.meetingsRepository.count({
      where: { isActive: true },
    });
    const deactived = await this.meetingsRepository.count({
      where: { isActive: false },
    });
    const total = await this.meetingsRepository.count();
    return { ok: true, meetings, actived, deactived, total };
  }

  async findAllBetweenDates(
    paginatorDto: PaginatorDto,
    datesBetweenDto: DatesBetweenDto,
  ) {
    const before = new Date(datesBetweenDto.before);
    const after = new Date(datesBetweenDto.after);
    const meetings = await this.meetingsRepository.find({
      ...paginatorDto,
      order: { date: 'ASC' },
      where: { date: Between(before, after) },
    });
    const actived = await this.meetingsRepository.count({
      where: { isActive: true },
    });
    const deactived = await this.meetingsRepository.count({
      where: { isActive: false },
    });
    const total = await this.meetingsRepository.count();
    return { ok: true, meetings, actived, deactived, total };
  }

  async findAllTree(paginatorDto: PaginatorDto) {
    const meetings = await this.meetingsRepository.find({
      ...paginatorDto,
      order: { date: 'ASC' },
      join: {
        alias: 'meeting',
        leftJoinAndSelect: {
          contract: 'meeting.contract',
          client: 'contract.client',
        },
      },
    });
    const actived = await this.meetingsRepository.count({
      where: { isActive: true },
    });
    const deactived = await this.meetingsRepository.count({
      where: { isActive: false },
    });
    const total = await this.meetingsRepository.count();
    return { ok: true, meetings, actived, deactived, total };
  }

  async findAllTreeBetweenDates(
    paginatorDto: PaginatorDto,
    datesBetweenDto: DatesBetweenDto,
  ) {
    const before = new Date(datesBetweenDto.before);
    const after = new Date(datesBetweenDto.after);
    const meetings = await this.meetingsRepository.find({
      ...paginatorDto,
      order: { date: 'ASC' },
      join: {
        alias: 'meeting',
        leftJoinAndSelect: {
          contract: 'meeting.contract',
          client: 'contract.client',
        },
      },
      where: { date: Between(before, after) },
    });
    const actived = await this.meetingsRepository.count({
      where: { isActive: true },
    });
    const deactived = await this.meetingsRepository.count({
      where: { isActive: false },
    });
    const total = await this.meetingsRepository.count();
    return { ok: true, meetings, actived, deactived, total };
  }

  async findAllByContractId(paginatorDto: PaginatorDto, contractId: number) {
    const meetings = await this.meetingsRepository.find({
      ...paginatorDto,
      order: { date: 'ASC' },
      where: { contract: { id: contractId } },
    });
    const actived = await this.meetingsRepository.count({
      where: { isActive: true },
    });
    const deactived = await this.meetingsRepository.count({
      where: { isActive: false },
    });
    const total = await this.meetingsRepository.count();
    return { ok: true, meetings, actived, deactived, total };
  }

  async findAllByClientId(paginatorDto: PaginatorDto, clientId: number) {
    const meetings = await this.meetingsRepository
      .createQueryBuilder('meeting')
      .innerJoinAndSelect('meeting.contract', 'contract')
      .innerJoinAndSelect('contract.client', 'client')
      .andWhere('contract.client = :id', { id: clientId })
      .andWhere('meeting.contract = :isActive', { isActive: true })
      .skip(paginatorDto.skip)
      .take(paginatorDto.take)
      .getMany();
    const actived = await this.meetingsRepository.count({
      where: { isActive: true },
    });
    const deactived = await this.meetingsRepository.count({
      where: { isActive: false },
    });
    const total = await this.meetingsRepository.count();
    return { ok: true, meetings, actived, deactived, total };
  }

  async findAllByClientIdBetweenDates(
    paginatorDto: PaginatorDto,
    clientId: number,
    datesBetweenDto?: DatesBetweenDto,
  ) {
    const before = new Date(datesBetweenDto.before);
    const after = new Date(datesBetweenDto.after);
    const meetings = await this.meetingsRepository
      .createQueryBuilder('meeting')
      .leftJoinAndSelect('meeting.contract', 'contract')
      .leftJoinAndSelect('contract.client', 'client')
      .andWhere('contract.client = :id', { id: clientId })
      .andWhere('meeting.date >= :before', { before })
      .andWhere('meeting.date < :after', { after })
      .skip(paginatorDto.skip)
      .take(paginatorDto.take)
      .getMany();
    const actived = await this.meetingsRepository.count({
      where: { isActive: true },
    });
    const deactived = await this.meetingsRepository.count({
      where: { isActive: false },
    });
    const total = await this.meetingsRepository.count();
    return { ok: true, meetings, actived, deactived, total };
  }

  async findOne(id: number) {
    const meeting = await this.meetingsRepository.findOne(id);
    if (!meeting) {
      throw new BadRequestException(
        `No se encontró ninguna cita con el identificador ${id}`,
      );
    }
    return { ok: true, meeting };
  }

  async findOneTree(id: number) {
    const meeting = await this.meetingsRepository.findOne(id, {
      join: {
        alias: 'meeting',
        leftJoinAndSelect: {
          contract: 'meeting.contract',
          client: 'contract.client',
        },
      },
    });
    if (!meeting) {
      throw new BadRequestException(
        `No se encontró ninguna cita con el identificador ${id}`,
      );
    }
    return { ok: true, meeting };
  }

  async update(id: number, updateMeetingDto: UpdateMeetingDto) {
    const meeting = await this.meetingsRepository.findOne(id);
    if (!meeting) {
      throw new BadRequestException(
        `No se encontró ninguna cita con el identificador ${id}`,
      );
    }
    if (!meeting.isActive) {
      throw new BadRequestException(
        'La cita no se puede modificar una vez se han realizado algún reconocimiento o esta pasada de fecha',
      );
    }
    const date = new Date(updateMeetingDto.date);
    await this.checkDate(date);
    date.setHours(0, 0, 0, 0);
    const { contract } = await this.contractService.findOne(
      updateMeetingDto.contractId,
    );
    if (!contract.isActive) {
      throw new BadRequestException(
        `Para actualizar la cita necesita un contrato activo`,
      );
    }
    const examsAvailable = contract.exams - contract.examsDone;
    if (updateMeetingDto.examsRequired > examsAvailable) {
      throw new BadRequestException(
        `La cantidad de reconocimientos solicitados excede la cantidad disponible por contrato: ${examsAvailable}`,
      );
    }

    const { contractId, ...dataToUpdate } = updateMeetingDto;

    const updateResult = await this.meetingsRepository.update(id, dataToUpdate);
    return { ok: updateResult.affected > 0 ? true : false };
  }

  async confirm(id: number, date: Date) {
    if (!date) {
      throw new BadRequestException(`La fecha de la cita es requerida`);
    }
    let meeting = await this.meetingsRepository.findOne(id);
    if (!meeting) {
      throw new BadRequestException(
        `No se encontró ninguna cita con el identificador ${id}`,
      );
    }
    meeting.date = new Date(date);
    meeting.confirmed = true;
    meeting = await this.meetingsRepository.save(meeting);
    return { ok: true, meeting };
  }

  async finalize(id: number, examsDone: number) {
    let meeting = await this.meetingsRepository.findOne(id);
    if (!meeting) {
      throw new BadRequestException(
        `No se encontró ninguna cita con el identificador ${id}`,
      );
    }
    meeting.examsDone = examsDone;
    meeting.isActive = false;
    meeting = await this.meetingsRepository.save(meeting);
    return { ok: true, meeting };
  }

  async removeOrActive(id: number, isActive: boolean) {
    const updateResult = await this.meetingsRepository.update(id, {
      isActive,
    });
    return { ok: updateResult.affected > 0 ? true : false };
  }

  // ==================================================
  //  Private
  // ==================================================
  private async checkDate(date: Date) {
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    if (date.getTime() < tomorrow.getTime()) {
      throw new BadRequestException(
        `Las citas solo se puede solicitar a partir del día siguiente`,
      );
    }
  }
}
