import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/institution/ISaveInstitutionDTO";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory";

import { CreateInstitutionUseCase } from "../createInstitution/CreateInstitutionUseCase";
import { UpdateInstitutionUseCase } from "./UpdateInstitutionUseCase";

let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let createInstitutionUseCase: CreateInstitutionUseCase;
let updateInstitutionUseCase: UpdateInstitutionUseCase;

describe("Update Institution", () => {
  beforeEach(() => {
    institutionsRepositoryInMemory = new InstitutionsRepositoryInMemory();

    createInstitutionUseCase = new CreateInstitutionUseCase(
      institutionsRepositoryInMemory,
    );

    updateInstitutionUseCase = new UpdateInstitutionUseCase(
      institutionsRepositoryInMemory,
    );
  });

  it("should be able to update a institution", async () => {
    let institution: ISaveInstitutionDTO = {
      cityId: "1d05966e-c0cb-50b3-84f5-0fe898aa16f0",
      name: "Institution Hozibseg",
    };

    await createInstitutionUseCase.execute(institution);

    institution = await institutionsRepositoryInMemory.findByName(
      institution.name,
    );

    Object.assign(institution, {
      cityId: "507f6a73-d50b-5380-8c1b-5c9810c563ea",
      name: "Institution Susan Allen",
    });

    const institutionUpdated = await updateInstitutionUseCase.execute(
      institution,
    );

    expect(institutionUpdated.name).toBe("Institution Susan Allen");
    expect(institutionUpdated.cityId).toBe(
      "507f6a73-d50b-5380-8c1b-5c9810c563ea",
    );
  });
});
