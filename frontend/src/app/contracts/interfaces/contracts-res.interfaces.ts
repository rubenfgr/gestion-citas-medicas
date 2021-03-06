import { IClient } from '../../clients/interfaces/client-res.interfaces';

export interface IContractCreateResponse {
  ok: boolean;
  contract: IContract;
}

export interface IContract {
  dateStart: Date;
  dateEnd: Date;
  clientId: string;
  exams: number;
  client: IClient;
  isActive: boolean;
  id: number;
  examsDone: number;
}

export interface IContractGetAllResponse {
  ok: boolean;
  contracts: IContract[];
  total?: number;
}

export interface IContractGetByClientIdResponse
  extends IContractGetAllResponse {}

export interface IContractGetByIdResponse extends IContractCreateResponse {}
