import { ISaveActivityDTO } from "../activity/ISaveActivityDTO";

interface ISaveChartDTO {
  id?: string;
  name: string;
  inForceFrom: string;
  courseId: string;
  isActive?: boolean;
  activities?: ISaveActivityDTO[];
}

export { ISaveChartDTO };
