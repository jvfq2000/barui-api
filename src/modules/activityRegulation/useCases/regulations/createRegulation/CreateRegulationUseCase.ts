import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ISaveRegulationDTO } from "@modules/activityRegulation/dtos/regulation/ISaveRegulationDTO";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { IRegulationsRepository } from "@modules/activityRegulation/repositories/IRegulationsRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateRegulationUseCase {
  constructor(
    @inject("RegulationsRepository")
    private regulationsRepository: IRegulationsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider,
  ) {}
  async execute(
    adminId: string,
    { name, inForceFrom, file, courseId }: ISaveRegulationDTO,
  ): Promise<void> {
    const user = await this.usersRepository.findById(adminId);

    const newCorseId = user.courseId || courseId;

    const course = await this.coursesRepository.findById(newCorseId);

    if (!course) {
      throw new AppError("Curso não encontrado.");
    }

    if (course.institutionId !== user.institutionId) {
      throw new AppError(
        "Para cadastrar um regulamento, você precisa estar vinculado a um campus.",
      );
    }

    const regulationAlreadyExists =
      await this.regulationsRepository.findByNameAndCourseId(name, newCorseId);

    if (regulationAlreadyExists) {
      throw new AppError("Já existe um regulamento com esse nome.");
    }

    await this.storageProvider.save(file, "regulation");

    await this.regulationsRepository.save({
      name,
      inForceFrom,
      courseId: newCorseId,
      file,
    });
  }
}

export { CreateRegulationUseCase };
