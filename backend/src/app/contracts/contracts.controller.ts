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
import { PaginatorDto } from './../shared/dto/paginator.dto';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractsService.create(createContractDto);
  }

  @Get()
  findAll(@Query() paginatorDto: PaginatorDto) {
    return this.contractsService.findAll(paginatorDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contractsService.findOne(+id);
  }

  @Get('client/:id')
  findByClientId(
    @Param('id', ParseIntPipe) clientId: number,
    @Query('isActive') isActive: any,
  ) {
    isActive === 'true' || isActive === undefined
      ? (isActive = true)
      : (isActive = false);
    return this.contractsService.findByClientId(clientId, isActive);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContractDto: UpdateContractDto,
  ) {
    return this.contractsService.update(+id, updateContractDto);
  }

  @Patch('activate/:id')
  removeOrActivate(
    @Param('id', ParseIntPipe) id: string,
    @Query('isActive', ParseBoolPipe) isActive: boolean,
  ) {
    return this.contractsService.removeOrActivate(+id, isActive);
  }
}
