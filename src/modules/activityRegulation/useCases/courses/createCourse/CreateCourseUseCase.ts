import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ISaveCourseDTO } from "@modules/activityRegulation/dtos/course/ISaveCourseDTO";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateCourseUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}
  async execute(
    adminId: string,
    { name, numberPeriods }: ISaveCourseDTO,
  ): Promise<void> {
    const adminUser = await this.usersRepository.findById(adminId);

    if (!adminUser.institutionId) {
      throw new AppError(
        "Para cadastrar um curso, você precisa estar vinculado a um campus.",
      );
    }

    const courseAlreadyExists =
      await this.coursesRepository.findByNameAndInstitutionId(
        name,
        adminUser.institutionId,
      );

    if (courseAlreadyExists) {
      throw new AppError("Já existe um curso com esse nome.");
    }

    await this.coursesRepository.save({
      name,
      numberPeriods,
      institutionId: adminUser.institutionId,
    });
  }
}

export { CreateCourseUseCase };
