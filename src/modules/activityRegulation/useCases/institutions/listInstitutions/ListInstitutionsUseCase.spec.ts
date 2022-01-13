import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory";
import { StatesRepositoryInMemory } from "@modules/territory/repositories/inMemory/StatesRepositoryInMemory";

import { ListInstitutionsUseCase } from "./ListInstitutionsUseCase";

let statesRepositoryInMemory: StatesRepositoryInMemory;
let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let listInstitutionsUseCase: ListInstitutionsUseCase;

describe("List Institutions", () => {
  beforeEach(() => {
    statesRepositoryInMemory = new StatesRepositoryInMemory();
    institutionsRepositoryInMemory = new InstitutionsRepositoryInMemory();

    listInstitutionsUseCase = new ListInstitutionsUseCase(
      institutionsRepositoryInMemory,
      statesRepositoryInMemory,
    );
  });

  it("should be able to list all institutions", async () => {
    const listInstitutions = await listInstitutionsUseCase.execute({
      page: 1,
      registersPerPage: 10,
      filter: "",
      isActive: true,
    });

    expect(listInstitutions).toHaveProperty("institutions");
    expect(listInstitutions).toHaveProperty("totalCount");
  });
});
