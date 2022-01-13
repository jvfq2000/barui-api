import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/institution/ISaveInstitutionDTO";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory";
import { CitiesRepositoryInMemory } from "@modules/territory/repositories/inMemory/CitiesRepositoryInMemory";
import { StatesRepositoryInMemory } from "@modules/territory/repositories/inMemory/StatesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateInstitutionUseCase } from "../createInstitution/CreateInstitutionUseCase";
import { FindInstitutionByIdUseCase } from "./FindInstitutionByIdUseCase";

let statesRepositoryInMemory: StatesRepositoryInMemory;
let citiesRepositoryInMemory: CitiesRepositoryInMemory;
let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let createInstitutionUseCase: CreateInstitutionUseCase;
let findInstitutionByIdUseCase: FindInstitutionByIdUseCase;

describe("Find Institution By Id", () => {
  beforeEach(() => {
    statesRepositoryInMemory = new StatesRepositoryInMemory();
    citiesRepositoryInMemory = new CitiesRepositoryInMemory();
    institutionsRepositoryInMemory = new InstitutionsRepositoryInMemory();

    createInstitutionUseCase = new CreateInstitutionUseCase(
      institutionsRepositoryInMemory,
    );

    findInstitutionByIdUseCase = new FindInstitutionByIdUseCase(
      institutionsRepositoryInMemory,
      statesRepositoryInMemory,
      citiesRepositoryInMemory,
    );
  });

  it("should be able to find institution by id", async () => {
    let institution: ISaveInstitutionDTO = {
      cityId: "1d05966e-c0cb-50b3-84f5-0fe898aa16f0",
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
        "ed8e2bd4-82b7-5f6a-b1df-93e94b818784",
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});
