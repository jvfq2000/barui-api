import { IGeneralListDTO } from "@utils/IGeneralListDTO";

import { IListChartsDTO } from "../dtos/chart/IListChartsDTO";
import { ISaveChartDTO } from "../dtos/chart/ISaveChartDTO";
import { Chart } from "../infra/typeorm/entities/Chart";

interface IChartsRepository {
  save(data: ISaveChartDTO): Promise<void>;
  findById(id: string): Promise<Chart>;
  findByNameAndCourseId(name: string, courseId: string): Promise<Chart>;
  findByStudentId(studentId: string): Promise<Chart>;
  list(data: IGeneralListDTO): Promise<IListChartsDTO>;
}

export { IChartsRepository };
