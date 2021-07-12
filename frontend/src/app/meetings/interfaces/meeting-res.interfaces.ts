import { IContract } from '../../contracts/interfaces/contracts-res.interfaces';

export interface IMeetingCreateResponse {
  ok: boolean;
  meeting: IMeeting;
}

export interface IMeetingGetByIdResponse extends IMeetingCreateResponse {}

export interface IMeeting {
  contract: IContract;
  date: Date;
  examsRequired: number;
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
