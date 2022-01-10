import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ICourseResponseDTO } from "@modules/activityRegulation/dtos/course/ICourseResponseDTO";
import { CourseMap } from "@modules/activityRegulation/mapper/courseMap";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";

interface IRequest {
  page: number;
  registersPerPage: number;
  filter: string;
  isActive: boolean;
}

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

  async execute(
    adminId: string,
    { page, registersPerPage, filter, isActive }: IRequest,
  ): Promise<IResponse> {
    const adminUser = await this.usersRepository.findById(adminId);

    const { courses, totalCount } = await this.coursesRepository.list(
      page || 1,
      registersPerPage || 10,
      filter || "",
      adminUser.institutionId || "",
    );

    const formattedCourses: ICourseResponseDTO[] = [];
    let totalCountIsActive = totalCount;

    courses.forEach(course => {
      if (course.isActive === isActive) {
        formattedCourses.push(CourseMap.toDTO(course));
      } else {
        totalCountIsActive -= 1;
      }
    });

    return { courses: formattedCourses, totalCount: totalCountIsActive };
  }
}

export { ListCoursesUseCase };
