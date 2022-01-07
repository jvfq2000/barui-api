import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ISaveCourseDTO } from "@modules/activityRegulation/dtos/course/ISaveCourseDTO";
import { Course } from "@modules/activityRegulation/infra/typeorm/entities/Course";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { AppError } from "@shared/errors/AppError";
import { accessLevel as accessLevelPermissions } from "@utils/permissions";

@injectable()
class UpdateCourseUseCase {
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
    { id, name, numberPeriods, institutionId }: ISaveCourseDTO,
  ): Promise<Course> {
    let course = await this.coursesRepository.findById(id);

    if (!course) {
      throw new AppError("Curso não encontrado.");
    }

    let newInstitutionId = institutionId;
    const adminUser = await this.usersRepository.findById(adminId);

    if (adminUser.accessLevel === accessLevelPermissions[3]) {
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

    Object.assign(course, {
      name,
      numberPeriods,
      institutionId,
    });

    await this.coursesRepository.save(course);

    course = await this.coursesRepository.findById(id);
    return course;
  }
}

export { UpdateCourseUseCase };
