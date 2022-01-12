import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/account/dtos/IUserResponseDTO";
import { UserMap } from "@modules/account/mapper/UserMap";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { ICitiesRepository } from "@modules/territory/repositories/ICitiesRepository";
import { IStatesRepository } from "@modules/territory/repositories/IStatesRepository";
import { AppError } from "@shared/errors/AppError";
import { accessLevel as accessLevelPermissions } from "@utils/permissions";

@injectable()
class FindUserByIdUseCase {
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

  async execute(adminId: string, userId: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    const adminUser = await this.usersRepository.findById(adminId);

    if (
      accessLevelPermissions[adminUser.accessLevel] <=
        accessLevelPermissions["administrador do campus"] &&
      adminUser.institutionId !== user.institutionId
    ) {
      throw new AppError(
        "Você não tem permissão para realizar esta ação!",
        401,
      );
    }

    if (
      accessLevelPermissions[adminUser.accessLevel] <
        accessLevelPermissions["administrador do campus"] &&
      adminUser.courseId !== user.courseId
    ) {
      throw new AppError(
        "Você não tem permissão para realizar esta ação!",
        401,
      );
    }

    user.course = user.courseId
      ? await this.coursesRepository.findById(user.courseId)
      : null;

    user.institution = user.institutionId
      ? await this.institutionsRepository.findById(user.institutionId)
      : null;

    user.institution.city = user.institutionId
      ? await this.citiesRepository.findById(user.institution.cityId)
      : null;

    user.institution.city.state = user.institutionId
      ? await this.statesRepository.findById(user.institution.city.stateId)
      : null;

    return UserMap.toDTO(user);
  }
}

export { FindUserByIdUseCase };
