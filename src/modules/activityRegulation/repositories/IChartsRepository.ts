import { IGeneralListDTO } from "@utils/IGeneralListDTO";

import { IListChartsDTO } from "../dtos/chart/IListChartsDTO";
import { ISaveChartDTO } from "../dtos/chart/ISaveChartDTO";
import { Chart } from "../infra/typeorm/entities/Chart";

interface IChartsRepository {
  save(data: ISaveChartDTO): Promise<void>;
  findByName(name: string): Promise<Chart>;
  findById(id: string): Promise<Chart>;
  listByCourseId(courseId: string): Promise<Chart[]>;
  list(data: IGeneralListDTO): Promise<IListChartsDTO>;
}

export { IChartsRepository };
