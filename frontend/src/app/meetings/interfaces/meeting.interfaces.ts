interface IMeetingCreateResponse {
  ok: boolean;
  meeting: IMeeting;
}

interface IMeetingGetByIdResponse extends IMeetingCreateResponse {}

interface IMeeting {
  contract: IContract;
  date: string;
  examsRequired: string;
  id: number;
  examsDone: number;
  confirmed: boolean;
  isActive: boolean;
}

interface IMeetingGetAllResponse {
  ok: boolean;
  meetings: IMeeting[];
  actived: number;
  deactived: number;
  total: number;
}
