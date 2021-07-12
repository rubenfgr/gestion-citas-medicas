import { DatesBetweenDto } from './../shared/dto/dates-between.dto';
import { PaginatorDto } from './../shared/dto/paginator.dto';
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
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { MeetingsService } from './meetings.service';

@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Post()
  create(@Body() createMeetingDto: CreateMeetingDto) {
    return this.meetingsService.create(createMeetingDto);
  }

  @Get()
  findAll(@Query() paginatorDto: PaginatorDto) {
    return this.meetingsService.findAll(paginatorDto);
  }

  @Get('/dates')
  findAllBetweenDates(
    @Query() paginatorDto: PaginatorDto,
    @Query() datesBetweenDto: DatesBetweenDto,
  ) {
    return this.meetingsService.findAllBetweenDates(
      paginatorDto,
      datesBetweenDto,
    );
  }

  @Get('all/tree')
  findAllTree(@Query() paginatorDto: PaginatorDto) {
    return this.meetingsService.findAllTree(paginatorDto);
  }

  @Get('all/tree/dates')
  findAllTreeBetweenDates(
    @Query() paginatorDto: PaginatorDto,
    @Query() datesBetweenDto: DatesBetweenDto,
  ) {
    return this.meetingsService.findAllTreeBetweenDates(
      paginatorDto,
      datesBetweenDto,
    );
  }

  @Get('all/contract/:contractId')
  findAllByContractId(
    @Query() paginatorDto: PaginatorDto,
    @Param('contractId', ParseIntPipe) contractId: number,
  ) {
    return this.meetingsService.findAllByContractId(paginatorDto, contractId);
  }

  @Get('all/client/:clientId')
  findAllByClientId(
    @Query() paginatorDto: PaginatorDto,
    @Param('clientId', ParseIntPipe) clientId: number,
  ) {
    return this.meetingsService.findAllByClientId(paginatorDto, clientId);
  }

  @Get('all/client/dates/:clientId')
  findAllByClientIdBetweenDates(
    @Query() paginatorDto: PaginatorDto,
    @Param('clientId', ParseIntPipe) clientId: number,
    @Query() datesBetweenDto: DatesBetweenDto,
  ) {
    return this.meetingsService.findAllByClientIdBetweenDates(
      paginatorDto,
      clientId,
      datesBetweenDto,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.meetingsService.findOne(+id);
  }

  @Get('one/tree/:id')
  findOneTree(@Param('id', ParseIntPipe) id: number) {
    return this.meetingsService.findOneTree(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMeetingDto: UpdateMeetingDto,
  ) {
    return this.meetingsService.update(+id, updateMeetingDto);
  }

  @Patch('confirm/:id')
  confirm(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMeetingDto: UpdateMeetingDto,
  ) {
    return this.meetingsService.confirm(id, updateMeetingDto.date);
  }

  @Patch('finalize/:id')
  finalize(
    @Param('id', ParseIntPipe) id: number,
    @Body('examsDone', ParseIntPipe) examsDone: number,
  ) {
    return this.meetingsService.finalize(id, examsDone);
  }

  @Patch('activate/:id')
  removeOrActive(
    @Param('id', ParseIntPipe) id: number,
    @Body('isActive', ParseBoolPipe) isActive: boolean,
  ) {
    return this.meetingsService.removeOrActive(+id, isActive);
  }
}
