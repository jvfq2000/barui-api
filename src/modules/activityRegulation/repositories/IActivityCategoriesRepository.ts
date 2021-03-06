import { IGeneralListDTO } from "@utils/IGeneralListDTO";

import { IListActivityCategoriesDTO } from "../dtos/activityCategory/IListActivityCategoriesDTO";
import { ISaveActivityCategoryDTO } from "../dtos/activityCategory/ISaveActivityCategoryDTO";
import { ActivityCategory } from "../infra/typeorm/entities/ActivityCategory";

interface IActivityCategoriesRepository {
  save(data: ISaveActivityCategoryDTO): Promise<void>;
  findByNameAndInstitutionId(
    name: string,
    institutionId: string,
  ): Promise<ActivityCategory>;
  findById(id: string): Promise<ActivityCategory>;
  listByInstitutionId(institutionId: string): Promise<ActivityCategory[]>;
  listByChartId(chartId: string): Promise<ActivityCategory[]>;
  list(data: IGeneralListDTO): Promise<IListActivityCategoriesDTO>;
}

export { IActivityCategoriesRepository };
