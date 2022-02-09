import { Chart } from "@modules/activityRegulation/infra/typeorm/entities/Chart";
import { IGeneralListDTO } from "@utils/IGeneralListDTO";

import { IListStudentActivitiesDTO } from "../dtos/studentActivity/IListStudentActivitiesDTO";
import { ISaveStudentActivityDTO } from "../dtos/studentActivity/ISaveStudentActivityDTO";
import { StudentActivity } from "../infra/typeorm/entities/StudentActivity";

interface IStudentActivitiesRepository {
  save(data: ISaveStudentActivityDTO): Promise<void>;
  findByDescriptionAndUserId(
    description: string,
    userId: string,
  ): Promise<StudentActivity>;
  findById(id: string): Promise<StudentActivity>;
  list(data: IGeneralListDTO): Promise<IListStudentActivitiesDTO>;
}

export { IStudentActivitiesRepository };
