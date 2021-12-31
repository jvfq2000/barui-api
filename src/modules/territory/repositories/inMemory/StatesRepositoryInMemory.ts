import { v4 as uuidV4 } from "uuid";

import { State } from "@modules/territory/infra/typeorm/entities/State";

import { IStatesRepository } from "../IStatesRepository";

class StatesRepositoryInMemory implements IStatesRepository {
  states: State[] = [
    {
      id: "48c47ca1-1532-5325-a9e3-ff1a0cdea5f9",
      name: "Croatia",
      acronym: "CT",
      createdAt: new Date(),
    },
    {
      id: "96cb3649-0c73-59f4-9f97-3331669c825c",
      name: "Cuba",
      acronym: "CB",
      createdAt: new Date(),
    },
    {
      id: "6052ac41-eaff-578c-a485-8cfb0b6b523a",
      name: "Caribbean Netherlands",
      acronym: "CN",
      createdAt: new Date(),
    },
  ];

  async list(): Promise<State[]> {
    return this.states;
  }

  async findById(id: string): Promise<State> {
    return this.states.find(state => state.id === id);
  }
}

export { StatesRepositoryInMemory };
