import { IInstitutionResponseDTO } from "../dtos/institution/IInstitutionResponseDTO";
import { Institution } from "../infra/typeorm/entities/Institution";

class InstitutionMap {
  static toDTO(institution: Institution): IInstitutionResponseDTO {
    const institutionDTO: IInstitutionResponseDTO = {
      id: institution.id,
      name: institution.name,
      isActive: institution.isActive,
      createdAt: institution.createdAt,

      cityId: institution.cityId,
      cityName: institution.city.name,

      stateId: institution.city.stateId,
      stateName: institution.city.state.name,
      stateAcronym: institution.city.state.acronym,
    };

    return institutionDTO;
  }
}

export { InstitutionMap };
