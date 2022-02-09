interface ISaveStudentActivityDTO {
  id?: string;
  description: string;
  hours: number;
  isCertified: boolean;
  justification?: string;
  approvedHours?: number;
  coordinatorVisa?: boolean;
  file?: string;
  isActive?: boolean;

  userId: string;
  activityId: string;
}

export { ISaveStudentActivityDTO };
