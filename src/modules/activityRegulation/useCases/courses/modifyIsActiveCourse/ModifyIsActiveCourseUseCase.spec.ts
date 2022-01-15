import { UsersRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersRepositoryInMemory";
import { ISaveCourseDTO } from "@modules/activityRegulation/dtos/course/ISaveCourseDTO";
import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/institution/ISaveInstitutionDTO";
import { CoursesRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/CoursesRepositoryInMemory";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory";

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
      usersRepositoryInMemory,
    );

    modifyIsActiveCourseUseCase = new ModifyIsActiveCourseUseCase(
      coursesRepositoryInMemory,
      usersRepositoryInMemory,
    );
  });

  it("should be able to modify active or inactive course status", async () => {
    let institution: ISaveInstitutionDTO = {
      cityId: "1d05966e-c0cb-50b3-84f5-0fe898aa16f0",
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

    courseInactivated =
      await coursesRepositoryInMemory.findByNameAndInstitutionId(
        courseInactivated.name,
        institution.id,
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

    courseActivated =
      await coursesRepositoryInMemory.findByNameAndInstitutionId(
        courseActivated.name,
        institution.id,
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
