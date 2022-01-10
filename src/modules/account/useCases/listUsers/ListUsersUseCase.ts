import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/account/dtos/IUserResponseDTO";
import { UserMap } from "@modules/account/mapper/UserMap";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { accessLevel } from "@utils/permissions";

interface IResponse {
  users: IUserResponseDTO[];
  totalCount: number;
}

interface IRequest {
  page: number;
  registersPerPage: number;
  filter: string;
  isActive: boolean;
}

@injectable()
class ListUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("InstitutionsRepository")
    private institutionsRepository: IInstitutionsRepository,
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
  ) {}

  async execute(
    adminId: string,
    { page, registersPerPage, filter, isActive }: IRequest,
  ): Promise<IResponse> {
    const adminUser = await this.usersRepository.findById(adminId);

    const { users, totalCount } = await this.usersRepository.list(
      page || 1,
      registersPerPage || 10,
      filter || "",
      adminUser.accessLevel === accessLevel[3] ? adminUser.institutionId : "",
    );
    const formattedUsers: IUserResponseDTO[] = [];
    let totalCountIsActive = totalCount;

    const usersPromise = users.map(async user => {
      if (user.isActive === isActive && user.id !== adminUser.id) {
        const userWithCourseAndInstitution = user;

        userWithCourseAndInstitution.institution = user.institutionId
          ? await this.institutionsRepository.findById(user.institutionId)
          : null;

        userWithCourseAndInstitution.course = user.courseId
          ? await this.coursesRepository.findById(user.courseId)
          : null;
        formattedUsers.push(UserMap.toDTO(userWithCourseAndInstitution));
      } else {
        totalCountIsActive -= 1;
      }
    });

    await Promise.all(usersPromise);

    return { users: formattedUsers, totalCount: totalCountIsActive };
  }
}

export { ListUsersUseCase };
