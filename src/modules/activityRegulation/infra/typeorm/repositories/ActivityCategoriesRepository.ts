import { getRepository, Repository } from "typeorm";

import { IListActivityCategoriesDTO } from "@modules/activityRegulation/dtos/activityCategory/IListActivityCategoriesDTO";
import { ISaveActivityCategoryDTO } from "@modules/activityRegulation/dtos/activityCategory/ISaveActivityCategoryDTO";
import { IActivityCategoriesRepository } from "@modules/activityRegulation/repositories/IActivityCategoriesRepository";
import { IGeneralListDTO } from "@utils/IGeneralListDTO";

import { ActivityCategory } from "../entities/ActivityCategory";

class ActivityCategoriesRepository implements IActivityCategoriesRepository {
  private repository: Repository<ActivityCategory>;

  constructor() {
    this.repository = getRepository(ActivityCategory);
  }

  async save({
    id,
    name,
    institutionId,
    isActive,
  }: ISaveActivityCategoryDTO): Promise<void> {
    const activityCategory = this.repository.create({
      id,
      name,
      institutionId,
      isActive,
    });

    await this.repository.save(activityCategory);
  }

  async findByNameAndInstitutionId(
    name: string,
    institutionId: string,
  ): Promise<ActivityCategory> {
    const activityCategory = await this.repository.findOne({
      name,
      institutionId,
    });
    return activityCategory;
  }

  async findById(id: string): Promise<ActivityCategory> {
    const activityCategory = await this.repository.findOne(id);

    return activityCategory;
  }

  async listByInstitutionId(
    institutionId: string,
  ): Promise<ActivityCategory[]> {
    const activityCategories = this.repository
      .createQueryBuilder("activity_category")
      .innerJoinAndSelect(
        "activity_category.institution",
        "institution",
        "institution.id = :institution_id",
      )

      .where("activity_category.is_active = true")

      .setParameter("institution_id", institutionId)
      .orderBy("activity_category.name")
      .getMany();

    return activityCategories;
  }

  async listByChartId(chartId: string): Promise<ActivityCategory[]> {
    const chart = this.repository
      .createQueryBuilder("activity_category")
      .innerJoin("activity_category.activity", "activity")
      .innerJoinAndSelect("activity.chart", "chart", `chart.id = ${chartId}`)

      .groupBy("activity_category.id")
      .orderBy("activity_category.name", "ASC")
      .getMany();

    return chart;
  }

  async list({
    institutionId,
    page,
    registersPerPage,
    filter,
    isActive,
  }: IGeneralListDTO): Promise<IListActivityCategoriesDTO> {
    let baseQuery = this.repository
      .createQueryBuilder("activity_category")
      .innerJoinAndSelect(
        "activity_category.institution",
        "institution",
        "institution.name like '%%'",
      )

      .where("(LOWER(activity_category.name) like LOWER(:filter)")
      .orWhere("LOWER(institution.name) like LOWER(:filter)")
      .orWhere(
        "to_char(activity_category.created_at, 'DD/MM/YYYY') like LOWER(:filter))",
      )
      .andWhere("activity_category.is_active = :is_active")

      .setParameter("filter", `%${filter}%`)
      .setParameter("is_active", isActive);

    if (institutionId) {
      baseQuery = baseQuery
        .andWhere("activity_category.institution_id = :institution_id")
        .setParameter("institution_id", institutionId);
    }

    const activityCategories = await baseQuery
      .skip(registersPerPage * (page - 1))
      .take(registersPerPage)
      .orderBy("activity_category.name")
      .getMany();

    const totalCount = await baseQuery.getCount();

    return { activityCategories, totalCount };
  }
}

export { ActivityCategoriesRepository };
