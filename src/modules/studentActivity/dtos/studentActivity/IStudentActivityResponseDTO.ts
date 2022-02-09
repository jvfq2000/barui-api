interface IStudentActivityResponseDTO {
  id: string;
  description: string;
  hours: number;
  isCertified: boolean;
  justification: string;
  approvedHours: number;
  coordinatorVisa: boolean;
  file: string;
  isActive: boolean;
  createdAt: Date;

  userId: string;
  userName: string;

  activityId: string;
  activityName: string;
}

export { IStudentActivityResponseDTO };
