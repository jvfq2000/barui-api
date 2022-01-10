import { getRepository, Repository } from "typeorm";

import { IListCoursesDTO } from "@modules/activityRegulation/dtos/course/IListCoursesDTO";
import { ISaveCourseDTO } from "@modules/activityRegulation/dtos/course/ISaveCourseDTO";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";

import { Course } from "../entities/Course";

class CoursesRepository implements ICoursesRepository {
  private repository: Repository<Course>;

  constructor() {
    this.repository = getRepository(Course);
  }

  async save({
    id,
    name,
    numberPeriods,
    institutionId,
    isActive,
  }: ISaveCourseDTO): Promise<void> {
    const course = this.repository.create({
      id,
      name,
      numberPeriods,
      institutionId,
      isActive,
    });

    await this.repository.save(course);
  }

  async findByName(name: string): Promise<Course> {
    const course = await this.repository.findOne({ name });

    return course;
  }

  async findById(id: string): Promise<Course> {
    const course = await this.repository.findOne(id);

    return course;
  }

  async list(
    page: number,
    registersPerPage: number,
    filter: string,
    institutionId: string,
  ): Promise<IListCoursesDTO> {
    let baseQuery = this.repository
      .createQueryBuilder("course")
      .innerJoinAndSelect(
        "course.institution",
        "institution",
        "institution.name like '%%'",
      )
      .where("(LOWER(course.name) like LOWER(:filter)")
      .orWhere("LOWER(institution.name) like LOWER(:filter)")
      .orWhere("to_char(course.created_at, 'DD/MM/YYYY') like LOWER(:filter))")
      .setParameter("filter", `%${filter}%`);

    if (institutionId) {
      baseQuery = baseQuery
        .andWhere("course.institution_id = :institution_id")
        .setParameter("institution_id", `${institutionId}`);
    }

    const courses = await baseQuery
      .skip(registersPerPage * (page - 1))
      .take(registersPerPage)
      .orderBy("course.name")
      .getMany();

    const totalCount = await baseQuery.getCount();

    return { courses, totalCount };
  }
}

export { CoursesRepository };
