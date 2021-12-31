import { StatesRepositoryInMemory } from "@modules/territory/repositories/inMemory/StatesRepositoryInMemory";

import { ListStatesUseCase } from "./ListStatesUseCase";

let statesRepositoryInMemory: StatesRepositoryInMemory;
let listStatesUseCase: ListStatesUseCase;

describe("List States", () => {
  beforeEach(() => {
    statesRepositoryInMemory = new StatesRepositoryInMemory();

    listStatesUseCase = new ListStatesUseCase(statesRepositoryInMemory);
  });

  it("should be able to list all states", async () => {
    const listStates = await listStatesUseCase.execute();

    expect(listStates.length > 0).toBe(true);
  });
});
