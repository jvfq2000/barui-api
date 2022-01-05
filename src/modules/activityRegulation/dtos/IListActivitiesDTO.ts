import { Activity } from "../infra/typeorm/entities/Activity";

interface IListActivitiesDTO {
  activities: Activity[];
  totalCount: number;
}

export { IListActivitiesDTO };
