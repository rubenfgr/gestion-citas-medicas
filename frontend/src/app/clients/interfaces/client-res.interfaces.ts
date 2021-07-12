import { IUser } from '../../users/interfaces/users-res.interfaces';

export interface IClientCreateResponse {
  ok: boolean;
  client: IClient;
}

export interface IClientGetByIdResponse extends IClientCreateResponse {}

export interface IClient {
  userId: string;
  name: string;
  address: string;
  city: string;
  province: string;
  cif: string;
  user: IUser;
  id: number;
}

export interface IClientGetAllReponse {
  ok: boolean;
  clients: IClient[];
  total: number;
}
