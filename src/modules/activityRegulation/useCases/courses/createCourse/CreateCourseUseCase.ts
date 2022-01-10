import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ISaveCourseDTO } from "@modules/activityRegulation/dtos/course/ISaveCourseDTO";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { AppError } from "@shared/errors/AppError";
import { accessLevel as accessLevelPermissions } from "@utils/permissions";

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
    { name, numberPeriods }: ISaveCourseDTO,
  ): Promise<void> {
    const courseAlreadyExists = await this.coursesRepository.findByName(name);

    if (courseAlreadyExists) {
      throw new AppError("Já existe um curso com esse nome.");
    }

    const adminUser = await this.usersRepository.findById(adminId);

    if (!adminUser.institutionId) {
      throw new AppError(
        "Para cadastrar um curso, você precisa estar vinculado a um campus.",
      );
    }

    await this.coursesRepository.save({
      name,
      numberPeriods,
      institutionId: adminUser.institutionId,
    });
  }
}

export { CreateCourseUseCase };
