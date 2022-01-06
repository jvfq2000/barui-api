import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { Course } from "@modules/activityRegulation/infra/typeorm/entities/Course";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { AppError } from "@shared/errors/AppError";
import { accessLevel as accessLevelPermitions } from "@utils/permitions";

@injectable()
class FindCourseByIdUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(adminId: string, courseId: string): Promise<Course> {
    const course = await this.coursesRepository.findById(courseId);

    if (!course) {
      throw new AppError("Curso não encontrado.");
    }

    const adminUser = await this.usersRepository.findById(adminId);

    if (
      adminUser.accessLevel === accessLevelPermitions[3] &&
      adminUser.institutionId !== course.institutionId
    ) {
      throw new AppError(
        "Você não tem permissão para realizar esta ação!",
        401,
      );
    }

    return course;
  }
}

export { FindCourseByIdUseCase };
