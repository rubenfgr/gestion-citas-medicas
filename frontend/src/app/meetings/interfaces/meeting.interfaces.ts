export interface CreateMeetingDto {
  contractId: number;
  date: Date;
  examsRequired: number;
}

export interface UpdateMeetingDto {
  date?: Date;
  examsRequired?: number;
}
