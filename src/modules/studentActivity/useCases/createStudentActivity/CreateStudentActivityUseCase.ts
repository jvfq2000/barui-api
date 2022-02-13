import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ISaveStudentActivityDTO } from "@modules/studentActivity/dtos/studentActivity/ISaveStudentActivityDTO";
import { IHistoricStudentActivitiesRepository } from "@modules/studentActivity/repositories/IHistoricStudentActivitiesRepository";
import { IStudentActivitiesRepository } from "@modules/studentActivity/repositories/IStudentActivitiesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateStudentActivityUseCase {
  constructor(
    @inject("StudentActivitiesRepository")
    private studentActivitiesRepository: IStudentActivitiesRepository,
    @inject("HistoricStudentActivitiesRepository")
    private historicStudentActivitiesRepository: IHistoricStudentActivitiesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider,
  ) {}
  async execute({
    description,
    hours,
    semester,
    isCertified,
    file,
    justification,
    activityId,
    userId,
  }: ISaveStudentActivityDTO): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    if (user.accessLevel !== "aluno") {
      throw new AppError("Somente alunos podem cadastrar atividades.");
    }

    const studentActivityAlreadyExists =
      await this.studentActivitiesRepository.findByDescriptionAndUserId(
        description,
        user.id,
      );

    if (studentActivityAlreadyExists) {
      throw new AppError(
        "Já existe uma atividade cadastrada com essa descrição.",
      );
    }

    await this.storageProvider.save(file, "activity");

    await this.studentActivitiesRepository.save({
      description,
      hours,
      semester,
      isCertified,
      file,
      justification,
      activityId,
      userId: user.id,
    });

    const studentActivityCreated =
      await this.studentActivitiesRepository.findByDescriptionAndUserId(
        description,
        user.id,
      );

    await this.historicStudentActivitiesRepository.save({
      action: "Cadastro",
      studentActivityId: studentActivityCreated.id,
      userId: user.id,
    });
  }
}

export { CreateStudentActivityUseCase };
