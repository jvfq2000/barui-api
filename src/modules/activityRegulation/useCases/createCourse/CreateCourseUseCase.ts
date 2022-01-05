import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ISaveCourseDTO } from "@modules/activityRegulation/dtos/ISaveCourseDTO";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { AppError } from "@shared/errors/AppError";
import { accessLevel as accessLevelPermitions } from "@utils/permitions";

@injectable()
class CreateCourseUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
    @inject("InstitutionsRepository")
    private institutionsRepository: IInstitutionsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}
  async execute(
    adminId: string,
    { name, numberPeriods, institutionId }: ISaveCourseDTO,
  ): Promise<void> {
    const courseAlreadyExists = await this.coursesRepository.findByName(name);

    if (courseAlreadyExists) {
      throw new AppError("Já existe um curso com esse nome.");
    }

    let newInstitutionId = institutionId;
    const adminUser = await this.usersRepository.findById(adminId);

    if (adminUser.accessLevel === accessLevelPermitions[3]) {
      newInstitutionId = adminUser.institutionId;
    } else if (!institutionId) {
      throw new AppError("Campus não informado.");
    }

    const institution = await this.institutionsRepository.findById(
      newInstitutionId,
    );

    if (!institution) {
      throw new AppError("Campus não encontrado.");
    }

    await this.coursesRepository.save({
      name,
      numberPeriods,
      institutionId: newInstitutionId,
    });
  }
}

export { CreateCourseUseCase };
