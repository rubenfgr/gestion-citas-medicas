interface IContractCreateResponse {
  ok: boolean;
  contract: IContract;
}

interface IContract {
  dateStart: string;
  dateEnd: string;
  clientId: string;
  exams: string;
  client: IClient;
  isActive: boolean;
  id: number;
  examsDone: number;
}

interface IContractGetAllResponse {
  ok: boolean;
  contracts: IContract[];
  total?: number;
}

interface IContractGetByClientIdResponse extends IContractGetAllResponse {}

interface IContractGetByIdResponse extends IContractCreateResponse {}
