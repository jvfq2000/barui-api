import { IGeneralListDTO } from "@utils/IGeneralListDTO";

import { IListActivitiesDTO } from "../dtos/activity/IListActivitiesDTO";
import { ISaveActivityDTO } from "../dtos/activity/ISaveActivityDTO";
import { Activity } from "../infra/typeorm/entities/Activity";

interface IActivitiesRepository {
  save(data: ISaveActivityDTO): Promise<void>;
  findByName(name: string): Promise<Activity>;
  findById(id: string): Promise<Activity>;
  listByChartIdAndCategoryId(
    chartId: string,
    categoryId: string,
  ): Promise<Activity[]>;
  list(data: IGeneralListDTO): Promise<IListActivitiesDTO>;
}

export { IActivitiesRepository };
