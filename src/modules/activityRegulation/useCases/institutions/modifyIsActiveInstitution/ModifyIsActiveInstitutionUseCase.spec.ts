import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/institution/ISaveInstitutionDTO";
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
      cityId: "1d05966e-c0cb-50b3-84f5-0fe898aa16f0",
      name: "Institution Hozibseg",
    };

    await createInstitutionUseCase.execute(insitutionInactivated);

    insitutionInactivated = await institutionsRepositoryInMemory.findByName(
      insitutionInactivated.name,
    );

    await modifyIsActiveInstitutionUseCase.execute(insitutionInactivated.id);

    let insitutionActivated: ISaveInstitutionDTO = {
      cityId: "1d05966e-c0cb-50b3-84f5-0fe898aa16f0",
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
