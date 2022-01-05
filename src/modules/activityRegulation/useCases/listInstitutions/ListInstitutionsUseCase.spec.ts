import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory copy";

import { ListInstitutionsUseCase } from "./ListInstitutionsUseCase";

let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let listInstitutionsUseCase: ListInstitutionsUseCase;

describe("List Institutions", () => {
  beforeEach(() => {
    institutionsRepositoryInMemory = new InstitutionsRepositoryInMemory();

    listInstitutionsUseCase = new ListInstitutionsUseCase(
      institutionsRepositoryInMemory,
    );
  });

  it("should be able to list all institutions", async () => {
    const listInstitutions = await listInstitutionsUseCase.execute({
      page: 1,
      registersPerPage: 10,
      filter: "",
    });

    expect(listInstitutions).toHaveProperty("institutions");
    expect(listInstitutions).toHaveProperty("totalCount");
  });
});
