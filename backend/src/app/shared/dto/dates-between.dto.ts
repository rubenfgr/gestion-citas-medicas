import { IsDateString } from 'class-validator';

export class DatesBetweenDto {
  @IsDateString()
  before: Date;

  @IsDateString()
  after: Date;
}
