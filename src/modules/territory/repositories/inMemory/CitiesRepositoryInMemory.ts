import { City } from "@modules/territory/infra/typeorm/entities/City";

import { ICitiesRepository } from "../ICitiesRepository";
import { StatesRepositoryInMemory } from "./StatesRepositoryInMemory";

class CitiesRepositoryInMemory implements ICitiesRepository {
  statesRepositoryInMemory = new StatesRepositoryInMemory();
  states = this.statesRepositoryInMemory.states;

  cities: City[] = [
    {
      id: "507f6a73-d50b-5380-8c1b-5c9810c563ea",
      name: "Zuwhirci",
      stateId: this.states[0].id,
      state: this.states[0],
      createdAt: new Date(),
    },
    {
      id: "fd595d16-e5aa-5c80-8c7c-390711411683",
      name: "Vizruhe",
      stateId: this.states[0].id,
      state: this.states[0],
      createdAt: new Date(),
    },
    {
      id: "f5533950-fa67-5d6b-9409-f196d397f966",
      name: "Popubac",
      stateId: this.states[1].id,
      state: this.states[1],
      createdAt: new Date(),
    },
    {
      id: "1d05966e-c0cb-50b3-84f5-0fe898aa16f0",
      name: "Hetavuh",
      stateId: this.states[1].id,
      state: this.states[1],
      createdAt: new Date(),
    },
    {
      id: "138b9dd2-355e-5e98-b9c5-9987af80dffe",
      name: "Cucevwif",
      stateId: this.states[2].id,
      state: this.states[2],
      createdAt: new Date(),
    },
    {
      id: "10ea750f-4fcb-5d4f-ae72-58f5d794bc57",
      name: "Levosot",
      stateId: this.states[2].id,
      state: this.states[2],
      createdAt: new Date(),
    },
  ];

  async list(): Promise<City[]> {
    return this.cities;
  }

  async listByStateId(stateId: string): Promise<City[]> {
    return this.cities.filter(city => city.stateId === stateId);
  }

  async findById(id: string): Promise<City> {
    return this.cities.find(city => city.id === id);
  }
}

export { CitiesRepositoryInMemory };
