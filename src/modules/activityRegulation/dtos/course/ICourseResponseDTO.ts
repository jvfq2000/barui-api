interface ICourseResponseDTO {
  id: string;
  name: string;
  numberPeriods: number;
  isActive: boolean;
  createdAt: Date;

  institutionId: string;
  institutionName: string;
}

export { ICourseResponseDTO };
