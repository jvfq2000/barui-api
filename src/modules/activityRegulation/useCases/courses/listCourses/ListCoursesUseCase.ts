import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ICourseResponseDTO } from "@modules/activityRegulation/dtos/course/ICourseResponseDTO";
import { CourseMap } from "@modules/activityRegulation/mapper/CourseMap";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { IGeneralListDTO } from "@utils/IGeneralListDTO";
import { accessLevel } from "@utils/permissions";

interface IResponse {
  courses: ICourseResponseDTO[];
  totalCount: number;
}

@injectable()
class ListCoursesUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    userId,
    page,
    registersPerPage,
    filter,
    isActive,
  }: IGeneralListDTO): Promise<IResponse> {
    const adminUser = await this.usersRepository.findById(userId);

    const institutionId =
      adminUser.accessLevel === accessLevel[3] ? adminUser.institutionId : "";

    const { courses, totalCount } = await this.coursesRepository.list({
      institutionId,
      page: page || 1,
      registersPerPage: registersPerPage || 10,
      filter: filter || "",
      isActive,
    });

    const formattedCourses: ICourseResponseDTO[] = [];

    courses.forEach(course => {
      formattedCourses.push(CourseMap.toDTO(course));
    });

    return { courses: formattedCourses, totalCount };
  }
}

export { ListCoursesUseCase };
