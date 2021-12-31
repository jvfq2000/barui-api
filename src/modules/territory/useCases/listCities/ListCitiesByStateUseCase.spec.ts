import { CitiesRepositoryInMemory } from "@modules/territory/repositories/inMemory/CitiesRepositoryInMemory";
import { StatesRepositoryInMemory } from "@modules/territory/repositories/inMemory/StatesRepositoryInMemory";

import { ListCitiesByStateUseCase } from "./ListCitiesByStateUseCase";

let citiesRepositoryInMemory: CitiesRepositoryInMemory;
let statesRepositoryInMemory: StatesRepositoryInMemory;
let listCitiesByStateUseCase: ListCitiesByStateUseCase;

describe("List Cities", () => {
  beforeEach(() => {
    citiesRepositoryInMemory = new CitiesRepositoryInMemory();
    statesRepositoryInMemory = new StatesRepositoryInMemory();

    listCitiesByStateUseCase = new ListCitiesByStateUseCase(
      citiesRepositoryInMemory,
      statesRepositoryInMemory,
    );
  });

  it("should be able to list all cities", async () => {
    const listCities = await listCitiesByStateUseCase.execute(
      "48c47ca1-1532-5325-a9e3-ff1a0cdea5f9",
    );

    expect(listCities.length > 0).toBe(true);
  });
});
