import { IListRegulationsDTO } from "../dtos/IListRegulationsDTO";
import { ISaveRegulationDTO } from "../dtos/ISaveRegulationDTO";
import { Regulation } from "../infra/typeorm/entities/Regulation";

interface IRegulationsRepository {
  save(data: ISaveRegulationDTO): Promise<void>;
  findByName(name: string): Promise<Regulation>;
  findById(id: string): Promise<Regulation>;
  list(
    page: number,
    registersPerPage: number,
    filter?: string,
  ): Promise<IListRegulationsDTO>;
}

export { IRegulationsRepository };
