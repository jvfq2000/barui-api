interface ISaveStudentActivityDTO {
  id?: string;
  description: string;
  hours: number;
  semester: string;
  isCertified: boolean;
  justification?: string;
  approvedHours?: number;
  file?: string;
  isActive?: boolean;

  userId: string;
  activityId: string;
}

export { ISaveStudentActivityDTO };
