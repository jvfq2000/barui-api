import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IHistoricStudentActivitiesRepository } from "@modules/studentActivity/repositories/IHistoricStudentActivitiesRepository";
import { IStudentActivitiesRepository } from "@modules/studentActivity/repositories/IStudentActivitiesRepository";
import { AppError } from "@shared/errors/AppError";
import { validateFindUserActivity } from "@utils/validateFindStudentActivity";

interface IRequest {
  currentUserId: string;
  userId: string;
  studentActivityId: string;
}

@injectable()
class ModifyIsActiveStudentActivityUseCase {
  constructor(
    @inject("StudentActivitiesRepository")
    private studentActivitiesRepository: IStudentActivitiesRepository,
    @inject("HistoricStudentActivitiesRepository")
    private historicStudentActivitiesRepository: IHistoricStudentActivitiesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    currentUserId,
    userId,
    studentActivityId,
  }: IRequest): Promise<void> {
    const studentActivity = await this.studentActivitiesRepository.findById(
      studentActivityId,
    );

    if (!studentActivity) {
      throw new AppError("Atividade complementar não encontrada.");
    }

    await validateFindUserActivity({
      studentActivity,
      usersRepository: this.usersRepository,
      currentUserId,
      userId,
    });

    studentActivity.isActive = !studentActivity.isActive;

    await this.studentActivitiesRepository.save(studentActivity);

    await this.historicStudentActivitiesRepository.save({
      action: studentActivity.isActive ? "Ativação" : "Inativação",
      studentActivityId: studentActivity.id,
      userId: currentUserId,
    });
  }
}

export { ModifyIsActiveStudentActivityUseCase };
