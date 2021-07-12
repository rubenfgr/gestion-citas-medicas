export interface CreateClientDto {
  userId: number;
  cif: string;
  name: string;
  address: string;
  city: string;
  province: string;
}

export interface UpdateClientDto {
  cif: string;
  name: string;
  address: string;
  city: string;
  province: string;
}
