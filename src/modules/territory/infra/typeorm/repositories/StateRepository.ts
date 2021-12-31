import { getRepository, Repository } from "typeorm";

import { IStatesRepository } from "@modules/territory/repositories/IStatesRepository";

import { State } from "../entities/State";

class StatesRepository implements IStatesRepository {
  private repository: Repository<State>;

  constructor() {
    this.repository = getRepository(State);
  }

  async findById(id: string): Promise<State> {
    const state = await this.repository.findOne(id);
    return state;
  }

  async list(): Promise<State[]> {
    const states = this.repository.find();
    return states;
  }
}

export { StatesRepository };
