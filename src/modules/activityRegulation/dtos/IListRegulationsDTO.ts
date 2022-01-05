import { Regulation } from "../infra/typeorm/entities/Regulation";

interface IListRegulationsDTO {
  regulations: Regulation[];
  totalCount: number;
}

export { IListRegulationsDTO };
