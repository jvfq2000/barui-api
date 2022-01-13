import { UsersRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersRepositoryInMemory";
import { ISaveCourseDTO } from "@modules/activityRegulation/dtos/course/ISaveCourseDTO";
import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/institution/ISaveInstitutionDTO";
import { CoursesRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/CoursesRepositoryInMemory";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory";

import { CreateInstitutionUseCase } from "../../institutions/createInstitution/CreateInstitutionUseCase";
import { CreateCourseUseCase } from "../createCourse/CreateCourseUseCase";
import { UpdateCourseUseCase } from "./UpdateCourseUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let coursesRepositoryInMemory: CoursesRepositoryInMemory;
let createInstitutionUseCase: CreateInstitutionUseCase;
let createCourseUseCase: CreateCourseUseCase;
let updateCourseUseCase: UpdateCourseUseCase;

describe("Update Course", () => {
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

    updateCourseUseCase = new UpdateCourseUseCase(
      coursesRepositoryInMemory,
      institutionsRepositoryInMemory,
      usersRepositoryInMemory,
    );
  });

  it("should be able to update a course", async () => {
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

    Object.assign(course, {
      name: "Course Herman Pierce",
      numberPeriods: 6,
    });

    const courseUpdated = await updateCourseUseCase.execute(
      "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      course,
    );

    expect(courseUpdated.name).toBe("Course Herman Pierce");
    expect(courseUpdated.numberPeriods).toBe(6);
  });
});
