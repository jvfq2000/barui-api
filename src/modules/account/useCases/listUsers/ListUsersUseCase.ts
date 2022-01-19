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

    const usersPromise = users.map(async user => {
      const fullUser = user;

      fullUser.course = fullUser.courseId
        ? await this.coursesRepository.findById(fullUser.courseId)
        : null;

      fullUser.institution = fullUser.institutionId
        ? await this.institutionsRepository.findById(fullUser.institutionId)
        : null;

      if (fullUser.institution) {
        fullUser.institution.city = fullUser.institutionId
          ? await this.citiesRepository.findById(fullUser.institution.cityId)
          : null;
      }

      if (fullUser.institution) {
        fullUser.institution.city.state = fullUser.institutionId
          ? await this.statesRepository.findById(
              fullUser.institution.city.stateId,
            )
          : null;
      }

      formattedUsers.push(UserMap.toDTO(fullUser));
    });

    await Promise.all(usersPromise);

    return { users: formattedUsers, totalCount };
  }
}

export { ListUsersUseCase };
