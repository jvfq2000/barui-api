interface ISaveHistoricStudentActivityDTO {
  action: string;
  field?: string;
  before?: string;
  later?: string;
  userId: string;
  studentActivityId: string;
}

export { ISaveHistoricStudentActivityDTO };
