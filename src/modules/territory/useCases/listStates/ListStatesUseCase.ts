import { inject, injectable } from "tsyringe";

import { State } from "@modules/territory/infra/typeorm/entities/State";
import { IStatesRepository } from "@modules/territory/repositories/IStatesRepository";

@injectable()
class ListStatesUseCase {
  constructor(
    @inject("StatesRepository")
    private statesRepository: IStatesRepository,
  ) {}

  async execute(): Promise<State[]> {
    const states = await this.statesRepository.list();

    return states;
  }
}

export { ListStatesUseCase };
