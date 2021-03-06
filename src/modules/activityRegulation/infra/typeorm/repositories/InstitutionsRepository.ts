import { getRepository, Repository } from "typeorm";

import { IListInstitutionsDTO } from "@modules/activityRegulation/dtos/institution/IListInstitutionsDTO";
import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/institution/ISaveInstitutionDTO";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { IGeneralListDTO } from "@utils/IGeneralListDTO";

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
    const institution = await this.repository.findOne(
      { name },
      { relations: ["city", "city.state"] },
    );

    return institution;
  }

  async findById(id: string): Promise<Institution> {
    const institution = await this.repository.findOne(id);
    return institution;
  }

  async listByCityId(cityId: string): Promise<Institution[]> {
    const institutions = await this.repository.find({ cityId });
    return institutions;
  }

  async list({
    page,
    registersPerPage,
    filter,
    isActive,
  }: IGeneralListDTO): Promise<IListInstitutionsDTO> {
    const baseQuery = this.repository
      .createQueryBuilder("institution")
      .innerJoinAndSelect("institution.city", "city", "city.name like '%%'")

      .where("(LOWER(institution.name) like LOWER(:filter)")
      .orWhere("LOWER(city.name) like LOWER(:filter)")
      .orWhere(
        "to_char(institution.created_at, 'DD/MM/YYYY') like LOWER(:filter))",
      )
      .andWhere("institution.is_active = :is_active")

      .setParameter("filter", `%${filter}%`)
      .setParameter("is_active", isActive);

    const institutions = await baseQuery
      .orderBy("institution.name")
      .skip(registersPerPage * (page - 1))
      .take(registersPerPage)
      .getMany();

    const totalCount = await baseQuery.getCount();

    return { institutions, totalCount };
  }
}

export { InstitutionsRepository };
