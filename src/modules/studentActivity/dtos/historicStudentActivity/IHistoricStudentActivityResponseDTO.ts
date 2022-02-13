interface IHistoricStudentActivityResponseDTO {
  id: string;
  action: string;
  field: string;
  before: string;
  later: string;
  createdAt: Date;

  userId: string;
  userName: string;

  studentActivityId: string;
  studentActivityName: string;
}

export { IHistoricStudentActivityResponseDTO };
