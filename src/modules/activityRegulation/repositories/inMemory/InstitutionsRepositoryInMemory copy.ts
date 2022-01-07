import { v4 as uuidV4 } from "uuid";

import { IListInstitutionsDTO } from "@modules/activityRegulation/dtos/institution/IListInstitutionsDTO";
import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/institution/ISaveInstitutionDTO";
import { Institution } from "@modules/activityRegulation/infra/typeorm/entities/Institution";

import { IInstitutionsRepository } from "../IInstitutionsRepository";

class InstitutionsRepositoryInMemory implements IInstitutionsRepository {
  institutions: Institution[] = [];

  async save({
    id,
    name,
    cityId,
    isActive,
  }: ISaveInstitutionDTO): Promise<void> {
    const institution = new Institution();

    Object.assign(institution, {
      id: id || uuidV4(),
      name,
      cityId,
      isActive: isActive === undefined || isActive === true,
    });

    this.institutions.push(institution);
  }

  async findByName(name: string): Promise<Institution> {
    return this.institutions.find(institution => institution.name === name);
  }

  async findById(id: string): Promise<Institution> {
    return this.institutions.find(institution => institution.id === id);
  }

  async list(
    page: number,
    registersPerPage: number,
    filter: string,
  ): Promise<IListInstitutionsDTO> {
    return {
      institutions: this.institutions,
      totalCount: this.institutions.length,
    };
  }
}

export { InstitutionsRepositoryInMemory };
