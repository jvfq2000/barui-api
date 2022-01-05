import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/ISaveInstitutionDTO";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory copy";

import { CreateInstitutionUseCase } from "../createInstitution/CreateInstitutionUseCase";
import { ModifyIsActiveInstitutionUseCase } from "./ModifyIsActiveInstitutionUseCase";

let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let createInstitutionUseCase: CreateInstitutionUseCase;
let modifyIsActiveInstitutionUseCase: ModifyIsActiveInstitutionUseCase;

describe("Modiry Is Active Institution", () => {
  beforeEach(() => {
    institutionsRepositoryInMemory = new InstitutionsRepositoryInMemory();

    createInstitutionUseCase = new CreateInstitutionUseCase(
      institutionsRepositoryInMemory,
    );

    modifyIsActiveInstitutionUseCase = new ModifyIsActiveInstitutionUseCase(
      institutionsRepositoryInMemory,
    );
  });

  it("should be able to modify active or inactive institution status", async () => {
    let insitutionInactivated: ISaveInstitutionDTO = {
      cityId: "48c47ca1-1532-5325-a9e3-ff1a0cdea5f9",
      name: "Institution Hozibseg",
    };

    await createInstitutionUseCase.execute(insitutionInactivated);

    insitutionInactivated = await institutionsRepositoryInMemory.findByName(
      insitutionInactivated.name,
    );

    await modifyIsActiveInstitutionUseCase.execute(insitutionInactivated.id);

    let insitutionActivated: ISaveInstitutionDTO = {
      cityId: "48c47ca1-1532-5325-a9e3-ff1a0cdea5f9",
      name: "Institution Mabelle Haynes",
    };

    await createInstitutionUseCase.execute(insitutionActivated);

    insitutionActivated = await institutionsRepositoryInMemory.findByName(
      insitutionActivated.name,
    );

    await modifyIsActiveInstitutionUseCase.execute(insitutionActivated.id);
    await modifyIsActiveInstitutionUseCase.execute(insitutionActivated.id);

    expect(insitutionActivated.isActive).toBe(true);
    expect(insitutionInactivated.isActive).toBe(false);
  });
});
