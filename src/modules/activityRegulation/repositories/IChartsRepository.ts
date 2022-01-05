import { IListChartsDTO } from "../dtos/IListChartsDTO";
import { ISaveChartDTO } from "../dtos/ISaveChartDTO";
import { Chart } from "../infra/typeorm/entities/Chart";

interface IChartsRepository {
  save(data: ISaveChartDTO): Promise<void>;
  findByName(name: string): Promise<Chart>;
  findById(id: string): Promise<Chart>;
  listByCourseId(courseId: string): Promise<Chart[]>;
  list(
    page: number,
    registersPerPage: number,
    filter: string,
  ): Promise<IListChartsDTO>;
}

export { IChartsRepository };
