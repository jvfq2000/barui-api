import { UsersRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersRepositoryInMemory";
import { ISaveCourseDTO } from "@modules/activityRegulation/dtos/course/ISaveCourseDTO";
import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/institution/ISaveInstitutionDTO";
import { CoursesRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/CoursesRepositoryInMemory";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory copy";
import { AppError } from "@shared/errors/AppError";

import { CreateInstitutionUseCase } from "../../institutions/createInstitution/CreateInstitutionUseCase";
import { CreateCourseUseCase } from "../createCourse/CreateCourseUseCase";
import { FindCourseByIdUseCase } from "./FindCourseByIdUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let coursesRepositoryInMemory: CoursesRepositoryInMemory;
let createInstitutionUseCase: CreateInstitutionUseCase;
let createCourseUseCase: CreateCourseUseCase;
let findCourseByIdUseCase: FindCourseByIdUseCase;

describe("Find Course By Id", () => {
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

    findCourseByIdUseCase = new FindCourseByIdUseCase(
      coursesRepositoryInMemory,
      usersRepositoryInMemory,
    );
  });

  it("should be able to find course by id", async () => {
    let institution: ISaveInstitutionDTO = {
      cityId: "1d05966e-c0cb-50b3-84f5-0fe898aa16f0",
      name: "Institution Iva Rowe",
    };

    await createInstitutionUseCase.execute(institution);

    institution = await institutionsRepositoryInMemory.findByName(
      institution.name,
    );

    let course: ISaveCourseDTO = {
      name: "Course Alexander Larson",
      numberPeriods: 8,
      institutionId: institution.id,
    };

    await createCourseUseCase.execute(
      "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      course,
    );

    course = await coursesRepositoryInMemory.findByName(course.name);

    const courseFoundById = await findCourseByIdUseCase.execute(
      "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      course.id,
    );
    expect(courseFoundById.id).toBe(course.id);
  });

  it("should not be able to find course if id non exists", async () => {
    await expect(
      findCourseByIdUseCase.execute(
        "a79e1e38-62bf-5223-9be4-f5081c33eec7",
        "test",
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});