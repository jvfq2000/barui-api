import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/ISaveInstitutionDTO";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory copy";
import { AppError } from "@shared/errors/AppError";

import { CreateInstitutionUseCase } from "../createInstitution/CreateInstitutionUseCase";
import { FindInstitutionByIdUseCase } from "./FindInstitutionByIdUseCase";

let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let createInstitutionUseCase: CreateInstitutionUseCase;
let findInstitutionByIdUseCase: FindInstitutionByIdUseCase;

describe("Find Institution By Id", () => {
  beforeEach(() => {
    institutionsRepositoryInMemory = new InstitutionsRepositoryInMemory();

    createInstitutionUseCase = new CreateInstitutionUseCase(
      institutionsRepositoryInMemory,
    );

    findInstitutionByIdUseCase = new FindInstitutionByIdUseCase(
      institutionsRepositoryInMemory,
    );
  });

  it("should be able to find institution by id", async () => {
    let institution: ISaveInstitutionDTO = {
      cityId: "48c47ca1-1532-5325-a9e3-ff1a0cdea5f9",
      name: "Institution Hozibseg",
    };

    await createInstitutionUseCase.execute(institution);

    institution = await institutionsRepositoryInMemory.findByName(
      institution.name,
    );

    const institutionFoundById = await findInstitutionByIdUseCase.execute(
      institution.id,
    );
    expect(institutionFoundById.id).toBe(institution.id);
  });

  it("should not be able to find institution if id non exists", async () => {
    await expect(
      findInstitutionByIdUseCase.execute(
        "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});
