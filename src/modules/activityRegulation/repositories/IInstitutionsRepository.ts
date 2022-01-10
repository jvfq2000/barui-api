import { IListInstitutionsDTO } from "../dtos/institution/IListInstitutionsDTO";
import { ISaveInstitutionDTO } from "../dtos/institution/ISaveInstitutionDTO";
import { Institution } from "../infra/typeorm/entities/Institution";

interface IInstitutionsRepository {
  save(data: ISaveInstitutionDTO): Promise<void>;
  findByName(name: string): Promise<Institution>;
  findById(id: string): Promise<Institution>;
  listByCityId(cityId: string): Promise<Institution[]>;
  list(
    page: number,
    registersPerPage: number,
    filter: string,
  ): Promise<IListInstitutionsDTO>;
}

export { IInstitutionsRepository };
