import { UsersRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersRepositoryInMemory";
import { ISaveCourseDTO } from "@modules/activityRegulation/dtos/course/ISaveCourseDTO";
import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/institution/ISaveInstitutionDTO";
import { CoursesRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/CoursesRepositoryInMemory";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateInstitutionUseCase } from "../../institutions/createInstitution/CreateInstitutionUseCase";
import { CreateCourseUseCase } from "./CreateCourseUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let coursesRepositoryInMemory: CoursesRepositoryInMemory;
let createInstitutionUseCase: CreateInstitutionUseCase;
let createCourseUseCase: CreateCourseUseCase;

describe("Create Course", () => {
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
  });

  it("should be able to create a new course", async () => {
    let institution: ISaveInstitutionDTO = {
      cityId: "1d05966e-c0cb-50b3-84f5-0fe898aa16f0",
      name: "Institution Iva Rowe",
    };

    await createInstitutionUseCase.execute(institution);

    institution = await institutionsRepositoryInMemory.findByName(
      institution.name,
    );

    const course: ISaveCourseDTO = {
      name: "Course Alexander Larson",
      numberPeriods: 8,
      institutionId: institution.id,
    };

    await createCourseUseCase.execute(
      "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      course,
    );

    const courseCreated =
      await coursesRepositoryInMemory.findByNameAndInstitutionId(
        course.name,
        institution.id,
      );

    expect(courseCreated).toHaveProperty("id");
  });

  it("should not be able to create a new course with name exists", async () => {
    expect(async () => {
      let institution: ISaveInstitutionDTO = {
        cityId: "1d05966e-c0cb-50b3-84f5-0fe898aa16f0",
        name: "Institution Frances Morton",
      };

      await createInstitutionUseCase.execute(institution);

      institution = await institutionsRepositoryInMemory.findByName(
        "Institution Frances Morton",
      );

      const course: ISaveCourseDTO = {
        name: "Course Lida Fields",
        numberPeriods: 8,
        institutionId: institution.id,
      };

      await createCourseUseCase.execute(
        "a79e1e38-62bf-5223-9be4-f5081c33eec7",
        course,
      );
      await createCourseUseCase.execute(
        "a79e1e38-62bf-5223-9be4-f5081c33eec7",
        course,
      );
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new course with institution non exists", async () => {
    expect(async () => {
      const course: ISaveCourseDTO = {
        name: "Course Julia Olson",
        numberPeriods: 8,
        institutionId: "82f88947-d9dd-5e38-9c59-0f65d93d99a1",
      };

      await createCourseUseCase.execute(
        "a79e1e38-62bf-5223-9be4-f5081c33eec7",
        course,
      );
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new course with institution uninformed", async () => {
    expect(async () => {
      const course: ISaveCourseDTO = {
        name: "Course Marian Wheeler",
        numberPeriods: 8,
      };

      await createCourseUseCase.execute(
        "a79e1e38-62bf-5223-9be4-f5081c33eec7",
        course,
      );
    }).rejects.toBeInstanceOf(AppError);
  });
});
