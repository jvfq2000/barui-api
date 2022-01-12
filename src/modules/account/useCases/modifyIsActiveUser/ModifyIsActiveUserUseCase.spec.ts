import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { UsersRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersRepositoryInMemory";
import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/institution/ISaveInstitutionDTO";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory copy";
import { CreateInstitutionUseCase } from "@modules/activityRegulation/useCases/institutions/createInstitution/CreateInstitutionUseCase";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ModifyIsActiveUserUseCase } from "./ModifyIsActiveUserUseCase";

let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createInstitutionUseCase: CreateInstitutionUseCase;
let createUserUseCase: CreateUserUseCase;
let modifyIsActiveUserUseCase: ModifyIsActiveUserUseCase;

describe("Modify Is Active User", () => {
  beforeEach(() => {
    institutionsRepositoryInMemory = new InstitutionsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    createInstitutionUseCase = new CreateInstitutionUseCase(
      institutionsRepositoryInMemory,
    );

    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      institutionsRepositoryInMemory,
    );

    modifyIsActiveUserUseCase = new ModifyIsActiveUserUseCase(
      usersRepositoryInMemory,
    );
  });

  it("should be able to modify active or inactive user status", async () => {
    let institution: ISaveInstitutionDTO = {
      cityId: "1d05966e-c0cb-50b3-84f5-0fe898aa16f0",
      name: "Institution Iva Rowe",
    };

    await createInstitutionUseCase.execute(institution);

    institution = await institutionsRepositoryInMemory.findByName(
      institution.name,
    );

    let userInactivated: ISaveUserDTO = {
      name: "Emily Dixon",
      lastName: "Jimmy Hopkins",
      email: "vojwacle@ku.ae",
      identifier: "24233361131",
      telephone: "(921) 583-5241",
      initialSemester: "1/2022",
      registration: "31191",
      accessLevel: "administrador do campus",
      institutionId: institution.id,
    };

    await createUserUseCase.execute(
      "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      userInactivated,
    );

    userInactivated = await usersRepositoryInMemory.findByEmail(
      userInactivated.email,
    );

    await modifyIsActiveUserUseCase.execute(
      "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      userInactivated.id,
    );

    let userActivated: ISaveUserDTO = {
      name: "Eliza Waters",
      lastName: "Sallie Harper",
      email: "fosgoc@kejundo.pl",
      identifier: "39257058502",
      telephone: "(921) 583-5241",
      initialSemester: "1/2022",
      registration: "43073",
      accessLevel: "administrador do campus",
      institutionId: institution.id,
    };

    await createUserUseCase.execute(
      "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      userActivated,
    );

    userActivated = await usersRepositoryInMemory.findByEmail(
      userActivated.email,
    );

    await modifyIsActiveUserUseCase.execute(
      "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      userActivated.id,
    );

    await modifyIsActiveUserUseCase.execute(
      "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      userActivated.id,
    );

    expect(userActivated.isActive).toBe(true);
    expect(userInactivated.isActive).toBe(false);
  });
});
