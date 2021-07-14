import { IsNotEmpty, IsNumber, Matches } from 'class-validator';

export class CreateClientDto {
  @IsNumber()
  userId: number;

  @Matches(/^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/, {
    message: `El cif no es correcto`,
  })
  cif: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  province: string;
}
