/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { PaginatorDto } from './../shared/dto/paginator.dto';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  findAll(@Query() paginatorDto: PaginatorDto) {
    return this.clientsService.findAll(paginatorDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientsService.findOne(+id);
  }

  @Get('user/:userId')
  findOneByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.clientsService.findOneByUserId(+userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Get('excel/:term')
  async toExcel(@Param('term') term: string | undefined, @Res() res: Response) {
    /* res.writeHead(200, [
      [
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ],
    ]); */
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    const stream = await this.clientsService.toExcel(term);
    stream.pipe(res);
  }
}
