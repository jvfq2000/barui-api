import { Chart } from "../../infra/typeorm/entities/Chart";

interface IListChartsDTO {
  charts: Chart[];
  totalCount: number;
}

export { IListChartsDTO };
