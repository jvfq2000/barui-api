import { UsersRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersRepositoryInMemory";
import { ISaveCourseDTO } from "@modules/activityRegulation/dtos/ISaveCourseDTO";
import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/ISaveInstitutionDTO";
import { CoursesRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/CoursesRepositoryInMemory";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory copy";

import { CreateInstitutionUseCase } from "../../institutions/createInstitution/CreateInstitutionUseCase";
import { CreateCourseUseCase } from "../createCourse/CreateCourseUseCase";
import { ModifyIsActiveCourseUseCase } from "./ModifyIsActiveCourseUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let coursesRepositoryInMemory: CoursesRepositoryInMemory;
let createInstitutionUseCase: CreateInstitutionUseCase;
let createCourseUseCase: CreateCourseUseCase;
let modifyIsActiveCourseUseCase: ModifyIsActiveCourseUseCase;

describe("Modiry Is Active Course", () => {
  beforeEach(() => {
    coursesRepositoryInMemory = new CoursesRepositoryInMemory();
    institutionsRepositoryInMemory = new InstitutionsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    createInstitutionUseCase = new CreateInstitutionUseCase(
      institutionsRepositoryInMemory,
    );

    createCourseUseCase = new CreateCourseUseCase(
      coursesRepositoryInMemory,
      institutionsRepositoryInMemory,
      usersRepositoryInMemory,
    );

    modifyIsActiveCourseUseCase = new ModifyIsActiveCourseUseCase(
      coursesRepositoryInMemory,
      usersRepositoryInMemory,
    );
  });

  it("should be able to modify active or inactive course status", async () => {
    let institution: ISaveInstitutionDTO = {
      cityId: "48c47ca1-1532-5325-a9e3-ff1a0cdea5f9",
      name: "Institution Iva Rowe",
    };

    await createInstitutionUseCase.execute(institution);

    institution = await institutionsRepositoryInMemory.findByName(
      institution.name,
    );

    let courseInactivated: ISaveCourseDTO = {
      name: "Course Alexander Larson",
      numberPeriods: 8,
      institutionId: institution.id,
    };

    await createCourseUseCase.execute(
      "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      courseInactivated,
    );

    courseInactivated = await coursesRepositoryInMemory.findByName(
      courseInactivated.name,
    );

    await modifyIsActiveCourseUseCase.execute(
      "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      courseInactivated.id,
    );

    let courseActivated: ISaveCourseDTO = {
      name: "Course Linnie Moore",
      numberPeriods: 8,
      institutionId: institution.id,
    };

    await createCourseUseCase.execute(
      "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      courseActivated,
    );

    courseActivated = await coursesRepositoryInMemory.findByName(
      courseActivated.name,
    );

    await modifyIsActiveCourseUseCase.execute(
      "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      courseActivated.id,
    );
    await modifyIsActiveCourseUseCase.execute(
      "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      courseActivated.id,
    );

    expect(courseActivated.isActive).toBe(true);
    expect(courseInactivated.isActive).toBe(false);
  });
});
