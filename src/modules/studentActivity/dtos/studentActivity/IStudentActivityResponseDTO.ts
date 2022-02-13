interface IStudentActivityResponseDTO {
  id: string;
  description: string;
  hours: number;
  semester: string;
  isCertified: boolean;
  justification: string;
  approvedHours: number;
  file: string;
  isActive: boolean;
  createdAt: Date;

  userId: string;
  userName: string;

  categoryId: string;
  categoryName: string;

  activityId: string;
  activityName: string;
}

export { IStudentActivityResponseDTO };
