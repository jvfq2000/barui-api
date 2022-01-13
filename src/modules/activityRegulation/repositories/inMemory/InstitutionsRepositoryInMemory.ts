import { v4 as uuidV4 } from "uuid";

import { IListInstitutionsDTO } from "@modules/activityRegulation/dtos/institution/IListInstitutionsDTO";
import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/institution/ISaveInstitutionDTO";
import { Institution } from "@modules/activityRegulation/infra/typeorm/entities/Institution";
import { IGeneralListDTO } from "@utils/IGeneralListDTO";

import { IInstitutionsRepository } from "../IInstitutionsRepository";

class InstitutionsRepositoryInMemory implements IInstitutionsRepository {
  institutions: Institution[] = [
    {
      id: "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      name: "Institution Hallie Holland",
      isActive: true,
      createdAt: new Date(),
      cityId: "507f6a73-d50b-5380-8c1b-5c9810c563ea",
      city: {
        id: "507f6a73-d50b-5380-8c1b-5c9810c563ea",
        name: "Zuwhirci",
        createdAt: new Date(),
        stateId: "48c47ca1-1532-5325-a9e3-ff1a0cdea5f9",
        state: null,
      },
    },
  ];

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

  async listByCityId(cityId: string): Promise<Institution[]> {
    return this.institutions.filter(
      institution => institution.cityId === cityId,
    );
  }

  async list({
    page,
    registersPerPage,
    filter,
    isActive,
  }: IGeneralListDTO): Promise<IListInstitutionsDTO> {
    return {
      institutions: this.institutions,
      totalCount: this.institutions.length,
    };
  }
}

export { InstitutionsRepositoryInMemory };
