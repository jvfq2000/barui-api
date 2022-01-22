import { IActivityResponseDTO } from "../activity/IActivityResponseDTO";

interface IChartResponseDTO {
  id: string;
  name: string;
  inForceFrom: string;
  isActive: boolean;
  createdAt: Date;

  courseId: string;
  courseName: string;

  activities: IActivityResponseDTO[];
}

export { IChartResponseDTO };
