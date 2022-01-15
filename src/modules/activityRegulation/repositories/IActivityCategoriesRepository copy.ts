import { IGeneralListDTO } from "@utils/IGeneralListDTO";

import { IListActivityCategoriesDTO } from "../dtos/activityCategory/IListActivityCategoriesDTO";
import { ISaveActivityCategoryDTO } from "../dtos/activityCategory/ISaveActivityCategoryDTO";
import { ActivityCategory } from "../infra/typeorm/entities/ActivityCategory";

interface IActivityCategoriesRepository {
  save(data: ISaveActivityCategoryDTO): Promise<void>;
  findByName(name: string): Promise<ActivityCategory>;
  findById(id: string): Promise<ActivityCategory>;
  list(data: IGeneralListDTO): Promise<IListActivityCategoriesDTO>;
}

export { IActivityCategoriesRepository };
