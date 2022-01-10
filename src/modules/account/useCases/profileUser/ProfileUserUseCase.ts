import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/account/dtos/IUserResponseDTO";
import { UserMap } from "@modules/account/mapper/UserMap";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("InstitutionsRepository")
    private institutionsRepository: IInstitutionsRepository,
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
  ) {}
  async execute(userId: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(userId);

    user.institution = await this.institutionsRepository.findById(
      user.institutionId,
    );

    user.course = await this.coursesRepository.findById(user.courseId);

    return UserMap.toDTO(user);
  }
}

export { ProfileUserUseCase };
