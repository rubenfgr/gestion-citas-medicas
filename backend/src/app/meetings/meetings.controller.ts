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
  findAll(
    @Query() paginatorDto: PaginatorDto,
    @Query('isActive') isActive: any,
  ) {
    isActive === 'true' || isActive === undefined
      ? (isActive = true)
      : (isActive = false);
    return this.meetingsService.findAll(paginatorDto, isActive);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.meetingsService.findOne(+id);
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
    @Query('examsDone', ParseIntPipe) examsDone: number,
  ) {
    this.meetingsService.confirm(id, examsDone);
  }

  @Patch('activate/:id')
  removeOrActive(
    @Param('id', ParseIntPipe) id: number,
    @Query('isActive', ParseBoolPipe) isActive: boolean,
  ) {
    return this.meetingsService.removeOrActive(+id, isActive);
  }
}
