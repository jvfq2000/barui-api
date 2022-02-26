interface IStudentResponseDTO {
  userId: string;
  userName: string;
  avatar: string;
  avatarUrl: string;
  initialSemester: string;
  registeredHours: number;
  approvedHours: number;
  rejectedHours: number;
  hoursNotAnalyzed: number;
}

export { IStudentResponseDTO };
