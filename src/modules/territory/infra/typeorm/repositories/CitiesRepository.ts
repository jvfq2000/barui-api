import { getRepository, Repository } from "typeorm";

import { ICitiesRepository } from "@modules/territory/repositories/ICitiesRepository";

import { City } from "../entities/City";

class CitiesRepository implements ICitiesRepository {
  private repository: Repository<City>;

  constructor() {
    this.repository = getRepository(City);
  }

  async findById(id: string): Promise<City> {
    const city = await this.repository.findOne(id);
    return city;
  }

  async listByStateId(stateId: string): Promise<City[]> {
    const cities = await this.repository.find({ stateId });
    return cities;
  }

  async list(): Promise<City[]> {
    const cities = this.repository.find();
    return cities;
  }
}

export { CitiesRepository };
