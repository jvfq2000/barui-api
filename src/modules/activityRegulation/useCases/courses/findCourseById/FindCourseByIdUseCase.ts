import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ICourseResponseDTO } from "@modules/activityRegulation/dtos/course/ICourseResponseDTO";
import { CourseMap } from "@modules/activityRegulation/mapper/CourseMap";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { AppError } from "@shared/errors/AppError";
import { accessLevel as accessLevelPermissions } from "@utils/permissions";

@injectable()
class FindCourseByIdUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
    @inject("InstitutionsRepository")
    private institutionsRepository: IInstitutionsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(
    adminId: string,
    courseId: string,
  ): Promise<ICourseResponseDTO> {
    const course = await this.coursesRepository.findById(courseId);

    if (!course) {
      throw new AppError("Curso não encontrado.");
    }

    const adminUser = await this.usersRepository.findById(adminId);

    if (
      adminUser.accessLevel === accessLevelPermissions[3] &&
      adminUser.institutionId !== course.institutionId
    ) {
      throw new AppError(
        "Você não tem permissão para realizar esta ação!",
        401,
      );
    }

    course.institution = await this.institutionsRepository.findById(
      course.institutionId,
    );

    return CourseMap.toDTO(course);
  }
}

export { FindCourseByIdUseCase };
