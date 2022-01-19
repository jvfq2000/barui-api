import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ISaveCourseDTO } from "@modules/activityRegulation/dtos/course/ISaveCourseDTO";
import { Course } from "@modules/activityRegulation/infra/typeorm/entities/Course";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateCourseUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(
    adminId: string,
    { id, name, numberPeriods }: ISaveCourseDTO,
  ): Promise<Course> {
    const adminUser = await this.usersRepository.findById(adminId);

    if (!adminUser.institutionId) {
      throw new AppError(
        "Para alterar um curso, você precisa estar vinculado a um campus.",
      );
    }

    let course = await this.coursesRepository.findById(id);

    if (!course) {
      throw new AppError("Curso não encontrado.");
    }

    Object.assign(course, {
      name,
      numberPeriods,
      institutionId: adminUser.institutionId,
    });

    await this.coursesRepository.save(course);

    course = await this.coursesRepository.findById(id);

    return course;
  }
}

export { UpdateCourseUseCase };
