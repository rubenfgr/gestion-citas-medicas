import { IsBoolean, IsDateString, IsNumberString, IsOptional } from 'class-validator';

export class CreateContractDto {
  @IsNumberString()
  clientId: number;

  @IsDateString()
  dateStart: Date;

  @IsDateString()
  dateEnd: Date;

  @IsNumberString()
  exams: number;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
