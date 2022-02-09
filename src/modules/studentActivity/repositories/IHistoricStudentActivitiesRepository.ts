import { IGeneralListDTO } from "@utils/IGeneralListDTO";

import { IListHistoricStudentActivitiesDTO } from "../dtos/historicStudentActivity/IListHistoricStudentActivitiesDTO";
import { ISaveHistoricStudentActivityDTO } from "../dtos/historicStudentActivity/ISaveHistoricStudentActivityDTO";

interface IHistoricStudentActivitiesRepository {
  save(data: ISaveHistoricStudentActivityDTO): Promise<void>;
  listByStudentActivityId(
    data: IGeneralListDTO,
  ): Promise<IListHistoricStudentActivitiesDTO>;
}

export { IHistoricStudentActivitiesRepository };
