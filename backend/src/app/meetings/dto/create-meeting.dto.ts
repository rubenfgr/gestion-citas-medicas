import { IsDateString, IsNumber } from 'class-validator';
export class CreateMeetingDto {
  @IsNumber()
  contractId: number;

  @IsDateString()
  date: Date;

  @IsNumber()
  examsRequired: number;
}
