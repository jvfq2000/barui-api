import { ISaveHistoricStudentActivityDTO } from "../dtos/historicStudentActivity/ISaveHistoricStudentActivityDTO";
import { HistoricStudentActivity } from "../infra/typeorm/entities/HistoricStudentActivity";

interface IHistoricStudentActivitiesRepository {
  save(data: ISaveHistoricStudentActivityDTO): Promise<void>;
  listByStudentActivityId(
    studentActivityId: string,
  ): Promise<HistoricStudentActivity[]>;
}

export { IHistoricStudentActivitiesRepository };
