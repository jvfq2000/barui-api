import { getRepository, Repository } from "typeorm";

import { User } from "@modules/account/infra/typeorm/entities/User";
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
    minHours,
    isActive,
    courseId,
  }: ISaveChartDTO): Promise<void> {
    const chart = this.repository.create({
      id,
      name,
      inForceFrom,
      minHours,
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

  async findByStudentId(studentId: string): Promise<Chart> {
    const chart = this.repository
      .createQueryBuilder("chart")
      .innerJoin("chart.course", "course")
      .innerJoinAndSelect(
        User,
        "user",
        `user.course_id = course.id and user.id = '${studentId}'`,
      )
      .select([
        "chart.id",
        "chart.name",
        "chart.in_force_from",
        "chart.min_hours",
        "chart.course_id",
        "chart.is_active",
        "chart.created_at",
      ])

      .where(
        `
          cast(split_part(chart.in_force_from, '/', 2) as integer)
          <= cast(split_part(user.initial_semester, '/', 2) as integer)
        `,
      )
      .andWhere(
        `
          cast(split_part(chart.in_force_from, '/', 1) as integer)
          <= cast(split_part(user.initial_semester, '/', 1) as integer)
        `,
      )
      .andWhere("chart.is_active = true")

      .orderBy("student_activity.is_active = :is_active")
      .orderBy(
        "cast(split_part(chart.in_force_from, '/', 2) as integer)",
        "DESC",
      )
      .addOrderBy(
        "cast(split_part(chart.in_force_from, '/', 1) as integer)",
        "DESC",
      )
      .getOne();

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
      .orderBy("chart.name")
      .skip(registersPerPage * (page - 1))
      .take(registersPerPage)
      .getMany();

    const totalCount = await baseQuery.getCount();

    return { charts, totalCount };
  }
}

export { ChartsRepository };
