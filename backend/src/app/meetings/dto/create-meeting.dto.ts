import { IsNumberString, IsDate, IsDateString } from 'class-validator';
export class CreateMeetingDto {
  @IsNumberString()
  contractId: number;

  @IsDateString()
  date: Date;

  @IsNumberString()
  examsRequired: number;
}
