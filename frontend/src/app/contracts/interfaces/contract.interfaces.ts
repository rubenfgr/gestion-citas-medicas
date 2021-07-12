export interface CreateContractDto {
  clientId: number;
  dateStart: Date;
  dateEnd: Date;
  exams: number;
}

export interface UpdateContractDto {
  dateStart: Date;
  dateEnd: Date;
  exams: Date;
  examsDone: number;
}
