interface IGeneralListDTO {
  userId?: string;
  institutionId?: string;
  courseId?: string;
  page: number;
  registersPerPage: number;
  filter: string;
  isActive: boolean;
}

export { IGeneralListDTO };
