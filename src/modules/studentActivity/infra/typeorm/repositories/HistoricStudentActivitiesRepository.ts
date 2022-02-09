import { getRepository, Repository } from "typeorm";

import { IListHistoricStudentActivitiesDTO } from "@modules/studentActivity/dtos/historicStudentActivity/IListHistoricStudentActivitiesDTO";
import { ISaveHistoricStudentActivityDTO } from "@modules/studentActivity/dtos/historicStudentActivity/ISaveHistoricStudentActivityDTO";
import { IHistoricStudentActivitiesRepository } from "@modules/studentActivity/repositories/IHistoricStudentActivitiesRepository";
import { IGeneralListDTO } from "@utils/IGeneralListDTO";

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
    data: IGeneralListDTO,
  ): Promise<IListHistoricStudentActivitiesDTO> {
    throw new Error("Method not implemented.");
  }
}

export { HistoricStudentActivitiesRepository };
