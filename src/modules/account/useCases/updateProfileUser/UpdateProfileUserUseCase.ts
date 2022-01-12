import { inject, injectable } from "tsyringe";

import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { IUserResponseDTO } from "@modules/account/dtos/IUserResponseDTO";
import { UserMap } from "@modules/account/mapper/UserMap";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { ICitiesRepository } from "@modules/territory/repositories/ICitiesRepository";
import { IStatesRepository } from "@modules/territory/repositories/IStatesRepository";

@injectable()
class UpdateProfileUserUseCase {
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
    id,
    name,
    lastName,
    email,
  }: ISaveUserDTO): Promise<IUserResponseDTO> {
    let user = await this.usersRepository.findById(id);

    Object.assign(user, { name, lastName, email });

    await this.usersRepository.save(user);

    user = await this.usersRepository.findById(id);

    user.course = user.courseId
      ? await this.coursesRepository.findById(user.courseId)
      : null;

    user.institution = user.institutionId
      ? await this.institutionsRepository.findById(user.institutionId)
      : null;

    if (user.institution) {
      user.institution.city = user.institutionId
        ? await this.citiesRepository.findById(user.institution.cityId)
        : null;
    }

    if (user.institution) {
      user.institution.city.state = user.institutionId
        ? await this.statesRepository.findById(user.institution.city.stateId)
        : null;
    }

    return UserMap.toDTO(user);
  }
}

export { UpdateProfileUserUseCase };
