interface IUserResponseDTO {
  id: string;
  name: string;
  lastName: string;
  email: string;
  identifier: string;
  telephone: string;
  initialSemester: string;
  registration: string;
  avatar: string;
  avatarUrl: string;
  accessLevel: string;
  isActive: boolean;
  createdAt: Date;

  courseId: string;
  courseName: string;
  courseNumberPeriods: number;

  institutionId: string;
  institutionName: string;
}

export { IUserResponseDTO };
