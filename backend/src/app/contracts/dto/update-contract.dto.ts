import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsNumberString, IsOptional } from 'class-validator';
import { CreateContractDto } from './create-contract.dto';

export class UpdateContractDto extends PartialType(
  OmitType(CreateContractDto, ['clientId'] as const),
) {
  @IsNumberString()
  @IsOptional()
  examsDone: number;
}
