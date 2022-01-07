import { ActivityCategory } from "../../infra/typeorm/entities/ActivityCategory";

interface IListActivityCategoriesDTO {
  activityCategories: ActivityCategory[];
  totalCount: number;
}

export { IListActivityCategoriesDTO };
