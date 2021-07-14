import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { CreateContractDto } from './create-contract.dto';

export class UpdateContractDto extends PartialType(
  OmitType(CreateContractDto, ['clientId'] as const),
) {
  @IsNumber()
  @IsOptional()
  examsDone?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
