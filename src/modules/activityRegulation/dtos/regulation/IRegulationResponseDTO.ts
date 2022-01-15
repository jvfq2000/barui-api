interface IRegulationResponseDTO {
  id: string;
  name: string;
  inForceFrom: string;
  file: string;
  fileUrl: string;
  isActive: boolean;
  createdAt: Date;

  courseId: string;
  courseName: string;
}

export { IRegulationResponseDTO };
