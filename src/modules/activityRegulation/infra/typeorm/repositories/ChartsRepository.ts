import { getRepository, Repository } from "typeorm";

import { IListChartsDTO } from "@modules/activityRegulation/dtos/chart/IListChartsDTO";
import { ISaveChartDTO } from "@modules/activityRegulation/dtos/chart/ISaveChartDTO";
import { IChartsRepository } from "@modules/activityRegulation/repositories/IChartsRepository";
import { IGeneralListDTO } from "@utils/IGeneralListDTO";

import { Chart } from "../entities/Chart";

class ChartsRepository implements IChartsRepository {
  private repository: Repository<Chart>;

  constructor() {
    this.repository = getRepository(Chart);
  }

  async save({
    id,
    name,
    inForceFrom,
    isActive,
    courseId,
  }: ISaveChartDTO): Promise<void> {
    const chart = this.repository.create({
      id,
      name,
      inForceFrom,
      isActive,
      courseId,
    });

    await this.repository.save(chart);
  }

  async findById(id: string): Promise<Chart> {
    const chart = await this.repository.findOne(id);
    return chart;
  }

  async findByNameAndCourseId(name: string, courseId: string): Promise<Chart> {
    const chart = await this.repository.findOne({ name, courseId });
    return chart;
  }

  async list({
    institutionId,
    courseId,
    page,
    registersPerPage,
    filter,
    isActive,
  }: IGeneralListDTO): Promise<IListChartsDTO> {
    let baseQuery = this.repository
      .createQueryBuilder("chart")
      .innerJoinAndSelect("chart.course", "course", "course.name like '%%'")
      .innerJoinAndSelect(
        "course.institution",
        "institution",
        "institution.name like '%%'",
      )

      .where("(LOWER(chart.name) like LOWER(:filter)")
      .orWhere("LOWER(course.name) like LOWER(:filter)")
      .orWhere("LOWER(institution.name) like LOWER(:filter)")
      .orWhere("LOWER(chart.in_force_from) like LOWER(:filter)")
      .orWhere("to_char(chart.created_at, 'DD/MM/YYYY') like LOWER(:filter))")
      .andWhere("chart.is_active = :is_active")

      .setParameter("filter", `%${filter}%`)
      .setParameter("is_active", isActive);

    if (institutionId) {
      baseQuery = baseQuery
        .andWhere("course.institution_id = :institution_id")
        .setParameter("institution_id", institutionId);
    }

    if (courseId) {
      baseQuery = baseQuery
        .andWhere("chart.course_id = :course_id")
        .setParameter("course_id", courseId);
    }

    const charts = await baseQuery
      .skip(registersPerPage * (page - 1))
      .take(registersPerPage)
      .orderBy("chart.name")
      .getMany();

    const totalCount = await baseQuery.getCount();

    return { charts, totalCount };
  }
}

export { ChartsRepository };
