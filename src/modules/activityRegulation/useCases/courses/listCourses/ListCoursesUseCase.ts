import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IListCoursesDTO } from "@modules/activityRegulation/dtos/course/IListCoursesDTO";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";

interface IRequest {
  page: number;
  registersPerPage: number;
  filter: string;
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
    { page, registersPerPage, filter }: IRequest,
  ): Promise<IListCoursesDTO> {
    const adminUser = await this.usersRepository.findById(adminId);

    const { courses, totalCount } = await this.coursesRepository.list(
      page || 1,
      registersPerPage || 10,
      filter || "",
      adminUser.institutionId || "",
    );

    return { courses, totalCount };
  }
}

export { ListCoursesUseCase };
