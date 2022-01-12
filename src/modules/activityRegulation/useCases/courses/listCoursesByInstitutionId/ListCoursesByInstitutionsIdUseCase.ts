import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ICourseResponseDTO } from "@modules/activityRegulation/dtos/course/ICourseResponseDTO";
import { CourseMap } from "@modules/activityRegulation/mapper/courseMap";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListCoursesByInstitutionIdUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(adminId: string): Promise<ICourseResponseDTO[]> {
    const adminUser = await this.usersRepository.findById(adminId);

    if (!adminUser.institutionId) {
      throw new AppError("É necessário que você esteja vinculado a um campus.");
    }

    const courses = await this.coursesRepository.listByInstitutionId(
      adminUser.institutionId,
    );

    const formattedCourses: ICourseResponseDTO[] = [];

    courses.forEach(course => {
      formattedCourses.push(CourseMap.toDTO(course));
    });

    return formattedCourses;
  }
}

export { ListCoursesByInstitutionIdUseCase };
