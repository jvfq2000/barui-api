import { getRepository, Repository } from "typeorm";

import { IListInstitutionsDTO } from "@modules/activityRegulation/dtos/IListInstitutionsDTO";
import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/ISaveInstitutionDTO";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";

import { Institution } from "../entities/Institution";

class InstitutionsRepository implements IInstitutionsRepository {
  private repository: Repository<Institution>;

  constructor() {
    this.repository = getRepository(Institution);
  }

  async save({
    id,
    name,
    cityId,
    isActive,
  }: ISaveInstitutionDTO): Promise<void> {
    const institution = this.repository.create({
      id,
      name,
      cityId,
      isActive,
    });

    await this.repository.save(institution);
  }

  async findByName(name: string): Promise<Institution> {
    const institution = await this.repository.findOne({ name });

    return institution;
  }

  async findById(id: string): Promise<Institution> {
    const institution = await this.repository.findOne(id);

    return institution;
  }

  async list(
    page: number,
    registersPerPage: number,
    filter: string,
  ): Promise<IListInstitutionsDTO> {
    const baseQuery = this.repository
      .createQueryBuilder("institution")
      .innerJoinAndSelect(
        "institution.city",
        "city",
        "LOWER(city.name) like LOWER(:filter)",
      )
      .where("LOWER(institution.name) like LOWER(:filter)")
      .orWhere(
        "to_char(institution.created_at, 'DD/MM/YYYY') like LOWER(:filter)",
      )
      .setParameter("filter", `%${filter}%`);

    const institutions = await baseQuery
      .skip(registersPerPage * (page - 1))
      .take(registersPerPage)
      .orderBy("institution.name")
      .getMany();

    const totalCount = await baseQuery.getCount();

    return { institutions, totalCount };
  }
}

export { InstitutionsRepository };
