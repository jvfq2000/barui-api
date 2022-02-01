import { ISaveActivityDTO } from "../dtos/activity/ISaveActivityDTO";
import { Activity } from "../infra/typeorm/entities/Activity";

interface IActivitiesRepository {
  save(data: ISaveActivityDTO[]): Promise<void>;
  findById(id: string): Promise<Activity>;
  listByChartIdAndCategoryId(
    chartId: string,
    categoryId: string,
  ): Promise<Activity[]>;
  listByChartId(chartId: string): Promise<Activity[]>;
}

export { IActivitiesRepository };
