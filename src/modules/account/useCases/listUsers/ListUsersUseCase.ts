import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/account/dtos/IUserResponseDTO";
import { UserMap } from "@modules/account/mapper/UserMap";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { CitiesRepository } from "@modules/territory/infra/typeorm/repositories/CitiesRepository";
import { ICitiesRepository } from "@modules/territory/repositories/ICitiesRepository";
import { IStatesRepository } from "@modules/territory/repositories/IStatesRepository";
import { IGeneralListDTO } from "@utils/IGeneralListDTO";
import { accessLevel } from "@utils/permissions";

interface IResponse {
  users: IUserResponseDTO[];
  totalCount: number;
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
    @inject("CitiesRepository")
    private citiesRepository: ICitiesRepository,
    @inject("StatesRepository")
    private statesRepository: IStatesRepository,
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

    const { users, totalCount } = await this.usersRepository.list({
      userId,
      institutionId,
      page: page || 1,
      registersPerPage: registersPerPage || 10,
      filter: filter || "",
      isActive,
    });
    const formattedUsers: IUserResponseDTO[] = [];
    const totalCountIsActive = totalCount;

    const usersPromise = users.map(async user => {
      const fullUser = user;

      fullUser.course = user.courseId
        ? await this.coursesRepository.findById(user.courseId)
        : null;

      fullUser.institution = user.institutionId
        ? await this.institutionsRepository.findById(user.institutionId)
        : null;

      fullUser.institution.city = user.institutionId
        ? await this.citiesRepository.findById(user.institution.cityId)
        : null;

      fullUser.institution.city.state = user.institutionId
        ? await this.statesRepository.findById(user.institution.city.stateId)
        : null;

      formattedUsers.push(UserMap.toDTO(fullUser));
    });

    await Promise.all(usersPromise);

    return { users: formattedUsers, totalCount: totalCountIsActive };
  }
}

export { ListUsersUseCase };
