import { inject, injectable } from "tsyringe";

import { City } from "@modules/territory/infra/typeorm/entities/City";
import { ICitiesRepository } from "@modules/territory/repositories/ICitiesRepository";
import { IStatesRepository } from "@modules/territory/repositories/IStatesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListCitiesByStateUseCase {
  constructor(
    @inject("CitiesRepository")
    private citiesRepository: ICitiesRepository,
    @inject("StatesRepository")
    private statesRepository: IStatesRepository,
  ) {}

  async execute(stateId: string): Promise<City[]> {
    const state = await this.statesRepository.findById(stateId);

    if (!state) {
      throw new AppError("Estado não encontrado.");
    }

    const cities = await this.citiesRepository.listByStateId(stateId);

    return cities;
  }
}

export { ListCitiesByStateUseCase };
