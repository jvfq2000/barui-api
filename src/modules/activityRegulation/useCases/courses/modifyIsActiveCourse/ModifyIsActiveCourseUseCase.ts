import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { AppError } from "@shared/errors/AppError";
import { accessLevel } from "@utils/permissions";

@injectable()
class ModifyIsActiveCourseUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(adminId: string, courseId: string): Promise<void> {
    const course = await this.coursesRepository.findById(courseId);

    if (!course) {
      throw new AppError("Campus não encontrado.");
    }

    const adminUser = await this.usersRepository.findById(adminId);

    if (
      adminUser.accessLevel === accessLevel[3] &&
      adminUser.institutionId !== course.institutionId
    ) {
      throw new AppError(
        "Você não tem permissão para realizar esta ação!",
        401,
      );
    }

    course.isActive = !course.isActive;

    await this.coursesRepository.save(course);
  }
}

export { ModifyIsActiveCourseUseCase };
