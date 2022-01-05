import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/ISaveInstitutionDTO";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory copy";
import { AppError } from "@shared/errors/AppError";

import { CreateInstitutionUseCase } from "./CreateInstitutionUseCase";

let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let createInstitutionUseCase: CreateInstitutionUseCase;

describe("Create Institution", () => {
  beforeEach(() => {
    institutionsRepositoryInMemory = new InstitutionsRepositoryInMemory();
    createInstitutionUseCase = new CreateInstitutionUseCase(
      institutionsRepositoryInMemory,
    );
  });

  it("should be able to create a new institution", async () => {
    const institution: ISaveInstitutionDTO = {
      cityId: "48c47ca1-1532-5325-a9e3-ff1a0cdea5f9",
      name: "Institution Hozibseg",
    };

    await createInstitutionUseCase.execute(institution);

    const institutionCreated = await institutionsRepositoryInMemory.findByName(
      institution.name,
    );

    expect(institutionCreated).toHaveProperty("id");
  });

  it("should not be able to create a new institution with name exists", async () => {
    expect(async () => {
      const institution: ISaveInstitutionDTO = {
        cityId: "48c47ca1-1532-5325-a9e3-ff1a0cdea5f9",
        name: "Institution Mina Hudson",
      };

      await createInstitutionUseCase.execute(institution);
      await createInstitutionUseCase.execute(institution);
    }).rejects.toBeInstanceOf(AppError);
  });
});
