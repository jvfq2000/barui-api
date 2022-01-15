import { IGeneralListDTO } from "@utils/IGeneralListDTO";

import { IListRegulationsDTO } from "../dtos/regulation/IListRegulationsDTO";
import { ISaveRegulationDTO } from "../dtos/regulation/ISaveRegulationDTO";
import { Regulation } from "../infra/typeorm/entities/Regulation";

interface IRegulationsRepository {
  save(data: ISaveRegulationDTO): Promise<void>;
  findById(id: string): Promise<Regulation>;
  findByNameAndCourseId(name: string, courseId: string): Promise<Regulation>;
  list(data: IGeneralListDTO): Promise<IListRegulationsDTO>;
}

export { IRegulationsRepository };
