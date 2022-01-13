import { UsersRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersTokensRepositoryInMemory";
import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/institution/ISaveInstitutionDTO";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory";

import { CreateInstitutionUseCase } from "../createInstitution/CreateInstitutionUseCase";
import { ModifyIsActiveInstitutionUseCase } from "./ModifyIsActiveInstitutionUseCase";

let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createInstitutionUseCase: CreateInstitutionUseCase;
let modifyIsActiveInstitutionUseCase: ModifyIsActiveInstitutionUseCase;

describe("Modiry Is Active Institution", () => {
  beforeEach(() => {
    institutionsRepositoryInMemory = new InstitutionsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

    createInstitutionUseCase = new CreateInstitutionUseCase(
      institutionsRepositoryInMemory,
    );

    modifyIsActiveInstitutionUseCase = new ModifyIsActiveInstitutionUseCase(
      institutionsRepositoryInMemory,
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
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
