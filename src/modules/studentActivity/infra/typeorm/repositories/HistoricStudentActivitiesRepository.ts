import { getRepository, Repository } from "typeorm";

import { ISaveHistoricStudentActivityDTO } from "@modules/studentActivity/dtos/historicStudentActivity/ISaveHistoricStudentActivityDTO";
import { IHistoricStudentActivitiesRepository } from "@modules/studentActivity/repositories/IHistoricStudentActivitiesRepository";

import { HistoricStudentActivity } from "../entities/HistoricStudentActivity";

class HistoricStudentActivitiesRepository
  implements IHistoricStudentActivitiesRepository
{
  private repository: Repository<HistoricStudentActivity>;

  constructor() {
    this.repository = getRepository(HistoricStudentActivity);
  }

  async save({
    action,
    field,
    before,
    later,
    studentActivityId,
    userId,
  }: ISaveHistoricStudentActivityDTO): Promise<void> {
    const historicStudentActivity = this.repository.create({
      action,
      field,
      before,
      later,
      studentActivityId,
      userId,
    });

    await this.repository.save(historicStudentActivity);
  }

  async listByStudentActivityId(
    studentActivityId: string,
  ): Promise<HistoricStudentActivity[]> {
    const historical = await this.repository.find({
      where: { studentActivityId },
      order: {
        createdAt: "DESC",
      },
    });
    return historical;
  }
}

export { HistoricStudentActivitiesRepository };
