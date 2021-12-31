import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/ISaveInstitutionDTO";

import { CreateInstitutionUseCase } from "./CreateInstitutionUseCase";

let createInstitutionUseCase: CreateInstitutionUseCase;

describe("Create Institution", () => {
  beforeEach(() => {
    createInstitutionUseCase = new CreateInstitutionUseCase();
  });

  it("should be able to create a new institution", async () => {
    const institution: ISaveInstitutionDTO = {
      cityId: "48c47ca1-1532-5325-a9e3-ff1a0cdea5f9",
      name: "Institution Hozibseg",
    };

    await createInstitutionUseCase.execute(institution);
  });
});
