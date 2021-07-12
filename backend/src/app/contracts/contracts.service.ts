import { PaginatorDto } from './../shared/dto/paginator.dto';
import { plainToClass } from 'class-transformer';
import { ClientsService } from './../clients/clients.service';
import { Contract } from './entities/contract.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Repository } from 'typeorm';
import { Client } from '../clients/entities/client.entity';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractsRepository: Repository<Contract>,
    private clientsService: ClientsService,
  ) {}

  async create(createContractDto: CreateContractDto) {
    const dateStart = new Date(createContractDto.dateStart);
    const dateEnd = new Date(createContractDto.dateEnd);
    await this.checkDates(dateStart, dateEnd);
    const clientContracts = await this.contractsRepository.find({
      where: { client: { id: createContractDto.clientId } },
    });
    for (let clientContract of clientContracts) {
      if (clientContract.dateEnd.getTime() <= new Date().getTime()) {
        clientContract.isActive = false;
        clientContract = await this.contractsRepository.save(clientContract);
      }
      if (clientContract.isActive) {
        throw new BadRequestException(
          `El cliente ya tiene un contracto activo con fecha de expiración: ${clientContract.dateEnd.toLocaleString()}`,
        );
      }
    }
    const { client } = await this.clientsService.findOne(
      createContractDto.clientId,
    );
    let contract = plainToClass(Contract, createContractDto);
    contract.client = client;
    contract.isActive = true;
    contract = await this.contractsRepository.save(contract);
    return { ok: true, contract };
  }

  async findAll(paginatorDto: PaginatorDto) {
    const contracts = await this.contractsRepository.find({
      ...paginatorDto,
    });
    const actived = await this.contractsRepository.count({
      where: { isActive: true },
    });
    const deactived = await this.contractsRepository.count({
      where: { isActive: false },
    });
    const total = await this.contractsRepository.count();
    return { ok: true, contracts, total, actived, deactived };
  }

  async findByClientId(clientId: number, isActive?: boolean) {
    let contracts: Contract[] = [];
    contracts = await this.contractsRepository.find({
      where: { client: { id: clientId }, isActive },
      join: {
        alias: 'contract',
        leftJoinAndSelect: { client: 'contract.client' },
      },
    });
    return { ok: true, contracts };
  }

  async findOne(id: number) {
    const contract = await this.contractsRepository.findOne(id);
    if (!contract) {
      throw new BadRequestException(
        `No existe ningún contrato con el identificador ${id}`,
      );
    }
    return { ok: true, contract };
  }

  async update(id: number, updateContractDto: UpdateContractDto) {
    if (Object.keys(updateContractDto).length <= 0) {
      throw new BadRequestException(
        'Deberías mandar al menos un valor para actualizar el contrato',
      );
    }
    const dateStart = new Date(updateContractDto.dateStart);
    const dateEnd = new Date(updateContractDto.dateEnd);
    await this.checkDates(dateStart, dateEnd);
    const contract = await this.contractsRepository.findOne(id);
    if (!contract) {
      throw new BadRequestException(
        `No existe ningún contrato con el identificador ${id}`,
      );
    }
    const updateResult = await this.contractsRepository.update(
      id,
      updateContractDto,
    );
    return { ok: updateResult.affected > 0 ? true : false };
  }

  async removeOrActivate(id: number, isActive: boolean) {
    const updateResult = await this.contractsRepository.update(id, {
      isActive,
    });
    return { ok: updateResult.affected > 0 ? true : false };
  }

  // ==================================================
  //  Private
  // ==================================================
  private async checkDates(dateStart: Date, dateEnd: Date) {
    if (dateStart.getTime() >= dateEnd.getTime()) {
      throw new BadRequestException(
        `La fecha de inicio no puede ser igual o mayor a la fecha de expiración`,
      );
    }
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 30);
    if (dateEnd.getTime() <= tomorrow.getTime()) {
      throw new BadRequestException(
        `La fecha de expiración debe ser mayor en un mes al día actual`,
      );
    }
  }
}
