import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/institution/ISaveInstitutionDTO";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory";
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
      cityId: "1d05966e-c0cb-50b3-84f5-0fe898aa16f0",
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
        cityId: "1d05966e-c0cb-50b3-84f5-0fe898aa16f0",
        name: "Institution Mina Hudson",
      };

      await createInstitutionUseCase.execute(institution);
      await createInstitutionUseCase.execute(institution);
    }).rejects.toBeInstanceOf(AppError);
  });
});
