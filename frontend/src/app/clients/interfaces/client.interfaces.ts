interface IClientCreateResponse {
  ok: boolean;
  client: IClient;
}

interface IClientGetByIdResponse extends IClientCreateResponse {}

interface IClient {
  userId: string;
  name: string;
  address: string;
  city: string;
  province: string;
  cif: string;
  user: IUser;
  id: number;
}

interface IClientGetAllReponse {
  ok: boolean;
  clients: IClient[];
  total: number;
}
