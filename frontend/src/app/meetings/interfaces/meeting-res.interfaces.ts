import { IContract } from '../../contracts/interfaces/contract.interfaces';

export interface IMeetingCreateResponse {
  ok: boolean;
  meeting: IMeeting;
}

export interface IMeetingGetByIdResponse extends IMeetingCreateResponse {}

export interface IMeeting {
  contract: IContract;
  date: string;
  examsRequired: string;
  id: number;
  examsDone: number;
  confirmed: boolean;
  isActive: boolean;
}

export interface IMeetingGetAllResponse {
  ok: boolean;
  meetings: IMeeting[];
  actived: number;
  deactived: number;
  total: number;
}
