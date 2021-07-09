import { IsNumberString, IsOptional } from 'class-validator';

export class PaginatorDto {
  @IsOptional()
  @IsNumberString()
  skip: number;

  @IsOptional()
  @IsNumberString()
  take: number;
}
