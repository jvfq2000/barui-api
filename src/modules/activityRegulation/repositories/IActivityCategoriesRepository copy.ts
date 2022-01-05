import { IListActivityCategoriesDTO } from "../dtos/IListActivityCategoriesDTO";
import { ISaveActivityCategoryDTO } from "../dtos/ISaveActivityCategoryDTO";
import { ActivityCategory } from "../infra/typeorm/entities/ActivityCategory";

interface IActivityCategoriesRepository {
  save(data: ISaveActivityCategoryDTO): Promise<void>;
  findByName(name: string): Promise<ActivityCategory>;
  findById(id: string): Promise<ActivityCategory>;
  list(
    page: number,
    registersPerPage: number,
    filter: string,
  ): Promise<IListActivityCategoriesDTO>;
}

export { IActivityCategoriesRepository };
