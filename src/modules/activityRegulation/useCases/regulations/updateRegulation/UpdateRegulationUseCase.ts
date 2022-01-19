import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ISaveRegulationDTO } from "@modules/activityRegulation/dtos/regulation/ISaveRegulationDTO";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { IRegulationsRepository } from "@modules/activityRegulation/repositories/IRegulationsRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateRegulationUseCase {
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
    { id, name, inForceFrom, file, courseId }: ISaveRegulationDTO,
  ): Promise<void> {
    const user = await this.usersRepository.findById(adminId);

    const newCorseId = user.courseId || courseId;

    const course = await this.coursesRepository.findById(newCorseId);

    if (!course) {
      throw new AppError("Curso não encontrado.");
    }

    if (course.institutionId !== user.institutionId) {
      throw new AppError(
        "Para alterar um regulamento, você precisa estar vinculado a um campus.",
      );
    }
    const regulation = await this.regulationsRepository.findById(id);

    if (!regulation) {
      throw new AppError("Regulamento não encontrado.");
    }

    if (file) {
      await this.storageProvider.delete(regulation.file, "regulation");
      await this.storageProvider.save(file, "regulation");
    }

    await this.regulationsRepository.save({
      id,
      name,
      inForceFrom,
      courseId: newCorseId,
      file,
    });
  }
}

export { UpdateRegulationUseCase };
