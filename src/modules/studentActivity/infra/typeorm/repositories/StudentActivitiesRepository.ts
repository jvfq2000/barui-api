import { getRepository, Repository } from "typeorm";

import { IListStudentActivitiesDTO } from "@modules/studentActivity/dtos/studentActivity/IListStudentActivitiesDTO";
import { ISaveStudentActivityDTO } from "@modules/studentActivity/dtos/studentActivity/ISaveStudentActivityDTO";
import { IStudentActivitiesRepository } from "@modules/studentActivity/repositories/IStudentActivitiesRepository";
import { IGeneralListDTO } from "@utils/IGeneralListDTO";

import { StudentActivity } from "../entities/StudentActivity";

class StudentActivitiesRepository implements IStudentActivitiesRepository {
  private repository: Repository<StudentActivity>;

  constructor() {
    this.repository = getRepository(StudentActivity);
  }

  async save({
    id,
    description,
    hours,
    isCertified,
    approvedHours,
    coordinatorVisa,
    file,
    justification,
    activityId,
    userId,
    isActive,
  }: ISaveStudentActivityDTO): Promise<void> {
    const studentActivity = this.repository.create({
      id,
      description,
      hours,
      isCertified,
      approvedHours,
      coordinatorVisa,
      file,
      justification,
      activityId,
      userId,
      isActive,
    });

    await this.repository.save(studentActivity);
  }

  async findById(id: string): Promise<StudentActivity> {
    const studentActivity = await this.repository.findOne(id);
    return studentActivity;
  }

  async findByDescriptionAndUserId(
    description: string,
    userId: string,
  ): Promise<StudentActivity> {
    const studentActivity = await this.repository.findOne({
      description,
      userId,
    });
    return studentActivity;
  }

  async list({
    userId,
    courseId,
    institutionId,
    filter,
    page,
    registersPerPage,
    isActive,
  }: IGeneralListDTO): Promise<IListStudentActivitiesDTO> {
    let baseQuery = this.repository
      .createQueryBuilder("student_activity")

      .where("(LOWER(student_activity.description) like LOWER(:filter)")
      .orWhere(
        "to_char(student_activity.created_at, 'DD/MM/YYYY') like LOWER(:filter))",
      )
      .andWhere("student_activity.is_active = :is_active")

      .setParameter("filter", `%${filter}%`)
      .setParameter("is_active", isActive);

    if (userId) {
      baseQuery = baseQuery
        .andWhere("student_activity.user_id = :user_id")
        .setParameter("user_id", userId);
    }

    if (institutionId) {
      baseQuery = baseQuery
        .andWhere("student_activity.user.institution_id = :institution_id")
        .setParameter("institution_id", institutionId);
    }

    if (courseId) {
      baseQuery = baseQuery
        .andWhere("student_activity.user.course_id = :course_id")
        .setParameter("course_id", courseId);
    }

    const studentActivities = await baseQuery
      .skip(registersPerPage * (page - 1))
      .take(registersPerPage)
      .orderBy("student_activity.description")
      .getMany();

    const totalCount = await baseQuery.getCount();

    return { studentActivities, totalCount };
  }
}

export { StudentActivitiesRepository };
