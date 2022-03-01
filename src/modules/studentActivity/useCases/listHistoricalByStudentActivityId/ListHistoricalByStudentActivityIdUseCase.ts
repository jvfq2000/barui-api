import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IHistoricStudentActivityResponseDTO } from "@modules/studentActivity/dtos/historicStudentActivity/IHistoricStudentActivityResponseDTO";
import { IStudentActivityResponseDTO } from "@modules/studentActivity/dtos/studentActivity/IStudentActivityResponseDTO";
import { HistoricStudentActivity } from "@modules/studentActivity/infra/typeorm/entities/HistoricStudentActivity";
import { HistoricStudentActivityMap } from "@modules/studentActivity/mapper/HistoricStudentActivityMap";
import { StudentActivityMap } from "@modules/studentActivity/mapper/StudentActivityMap";
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
class ListHistoricalByStudentActivityIdUseCase {
  constructor(
    @inject("HistoricStudentActivitiesRepository")
    private historicStudentActivitiesRepository: IHistoricStudentActivitiesRepository,
    @inject("StudentActivitiesRepository")
    private studentActivitiesRepository: IStudentActivitiesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(
    studentActivityId: string,
  ): Promise<IHistoricStudentActivityResponseDTO[]> {
    const studentActivity = await this.studentActivitiesRepository.findById(
      studentActivityId,
    );

    if (!studentActivity) {
      throw new AppError("Atividade complementar não encontrada.");
    }

    const historical =
      await this.historicStudentActivitiesRepository.listByStudentActivityId(
        studentActivity.id,
      );

    const formattedHistorical: IHistoricStudentActivityResponseDTO[] = [];

    const historicalPromise = historical.map(async historic => {
      const fullHistoric = historic;

      fullHistoric.studentActivity = studentActivity;
      fullHistoric.user = await this.usersRepository.findById(historic.userId);

      formattedHistorical.push(HistoricStudentActivityMap.toDTO(fullHistoric));
    });

    await Promise.all(historicalPromise);

    return formattedHistorical;
  }
}

export { ListHistoricalByStudentActivityIdUseCase };
