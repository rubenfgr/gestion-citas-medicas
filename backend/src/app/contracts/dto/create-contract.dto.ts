import { IsDateString, IsNumber, IsNumberString } from 'class-validator';

export class CreateContractDto {
  @IsNumber()
  clientId: number;

  @IsDateString()
  dateStart: Date;

  @IsDateString()
  dateEnd: Date;

  @IsNumber()
  exams: number;
}
