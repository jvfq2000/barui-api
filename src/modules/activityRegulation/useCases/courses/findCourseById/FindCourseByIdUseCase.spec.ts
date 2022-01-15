import { UsersRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersRepositoryInMemory";
import { ISaveCourseDTO } from "@modules/activityRegulation/dtos/course/ISaveCourseDTO";
import { CoursesRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/CoursesRepositoryInMemory";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCourseUseCase } from "../createCourse/CreateCourseUseCase";
import { FindCourseByIdUseCase } from "./FindCourseByIdUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let coursesRepositoryInMemory: CoursesRepositoryInMemory;
let createCourseUseCase: CreateCourseUseCase;
let findCourseByIdUseCase: FindCourseByIdUseCase;

describe("Find Course By Id", () => {
  beforeEach(() => {
    coursesRepositoryInMemory = new CoursesRepositoryInMemory();
    institutionsRepositoryInMemory = new InstitutionsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    createCourseUseCase = new CreateCourseUseCase(
      coursesRepositoryInMemory,
      usersRepositoryInMemory,
    );

    findCourseByIdUseCase = new FindCourseByIdUseCase(
      coursesRepositoryInMemory,
      institutionsRepositoryInMemory,
      usersRepositoryInMemory,
    );
  });

  it("should be able to find course by id", async () => {
    let course: ISaveCourseDTO = {
      name: "Course Alexander Larson",
      numberPeriods: 8,
    };

    await createCourseUseCase.execute(
      "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      course,
    );

    course = await coursesRepositoryInMemory.findByNameAndInstitutionId(
      course.name,
      "a79e1e38-62bf-5223-9be4-f5081c33eec7",
    );

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
