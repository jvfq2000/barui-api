import { getRepository, Repository } from "typeorm";

import { IListRegulationsDTO } from "@modules/activityRegulation/dtos/regulation/IListRegulationsDTO";
import { ISaveRegulationDTO } from "@modules/activityRegulation/dtos/regulation/ISaveRegulationDTO";
import { IRegulationsRepository } from "@modules/activityRegulation/repositories/IRegulationsRepository";
import { IGeneralListDTO } from "@utils/IGeneralListDTO";

import { Regulation } from "../entities/Regulation";

class RegulationsRepository implements IRegulationsRepository {
  private repository: Repository<Regulation>;

  constructor() {
    this.repository = getRepository(Regulation);
  }

  async save({
    id,
    name,
    file,
    inForceFrom,
    isActive,
    courseId,
  }: ISaveRegulationDTO): Promise<void> {
    const regulation = this.repository.create({
      id,
      name,
      file,
      inForceFrom,
      isActive,
      courseId,
    });

    await this.repository.save(regulation);
  }

  async findById(id: string): Promise<Regulation> {
    const regulation = await this.repository.findOne(id);
    return regulation;
  }

  async findByNameAndCourseId(
    name: string,
    courseId: string,
  ): Promise<Regulation> {
    const regulation = await this.repository.findOne({ name, courseId });
    return regulation;
  }

  async list({
    institutionId,
    courseId,
    page,
    registersPerPage,
    filter,
    isActive,
  }: IGeneralListDTO): Promise<IListRegulationsDTO> {
    let baseQuery = this.repository
      .createQueryBuilder("regulation")
      .innerJoinAndSelect(
        "regulation.course",
        "course",
        "course.name like '%%'",
      )
      .innerJoinAndSelect(
        "course.institution",
        "institution",
        "institution.name like '%%'",
      )

      .where("(LOWER(regulation.name) like LOWER(:filter)")
      .orWhere("LOWER(course.name) like LOWER(:filter)")
      .orWhere("LOWER(institution.name) like LOWER(:filter)")
      .orWhere("LOWER(regulation.in_force_from) like LOWER(:filter)")
      .orWhere(
        "to_char(regulation.created_at, 'DD/MM/YYYY') like LOWER(:filter))",
      )
      .andWhere("regulation.is_active = :is_active")

      .setParameter("filter", `%${filter}%`)
      .setParameter("is_active", isActive);

    if (institutionId) {
      baseQuery = baseQuery
        .andWhere("course.institution_id = :institution_id")
        .setParameter("institution_id", institutionId);
    }

    if (courseId) {
      baseQuery = baseQuery
        .andWhere("regulation.course_id = :course_id")
        .setParameter("course_id", courseId);
    }

    const regulations = await baseQuery
      .orderBy("regulation.name")
      .skip(registersPerPage * (page - 1))
      .take(registersPerPage)
      .getMany();

    const totalCount = await baseQuery.getCount();

    return { regulations, totalCount };
  }
}

export { RegulationsRepository };
