import { getRepository, Repository } from "typeorm";

import { IListActivityCategoriesDTO } from "@modules/activityRegulation/dtos/activityCategory/IListActivityCategoriesDTO";
import { ISaveActivityCategoryDTO } from "@modules/activityRegulation/dtos/activityCategory/ISaveActivityCategoryDTO";
import { IActivityCategoriesRepository } from "@modules/activityRegulation/repositories/IActivityCategoriesRepository";
import { IGeneralListDTO } from "@utils/IGeneralListDTO";

import { Activity } from "../entities/Activity";
import { ActivityCategory } from "../entities/ActivityCategory";
import { Chart } from "../entities/Chart";

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
    const activityCategories = this.repository
      .createQueryBuilder("activity_category")
      .innerJoinAndSelect(
        Activity,
        "activity",
        "activity.category_id = activity_category.id",
      )
      .innerJoinAndSelect(
        Chart,
        "chart",
        `chart.id = activity.chart_id and chart.id = '${chartId}'`,
      )
      .select([
        "activity_category.id",
        "activity_category.name",
        "activity_category.institution_id",
        "activity_category.is_active",
        "activity_category.created_at",
      ])

      .where("activity_category.is_active = true")

      .groupBy("activity_category.id")
      .orderBy("activity_category.name", "ASC")
      .getMany();

    return activityCategories;
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
      .orderBy("activity_category.name")
      .skip(registersPerPage * (page - 1))
      .take(registersPerPage)
      .getMany();

    const totalCount = await baseQuery.getCount();

    return { activityCategories, totalCount };
  }
}

export { ActivityCategoriesRepository };
