import { City } from "../infra/typeorm/entities/City";

interface ICitiesRepository {
  list(): Promise<City[]>;
  listByStateId(stateId: string): Promise<City[]>;
  findById(id: string): Promise<City>;
}

export { ICitiesRepository };
