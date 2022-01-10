import { UsersRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersRepositoryInMemory";
import { CoursesRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/CoursesRepositoryInMemory";

import { ListCoursesUseCase } from "./ListCoursesUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let coursesRepositoryInMemory: CoursesRepositoryInMemory;
let listCoursesUseCase: ListCoursesUseCase;

describe("List Courses", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    coursesRepositoryInMemory = new CoursesRepositoryInMemory();

    listCoursesUseCase = new ListCoursesUseCase(
      coursesRepositoryInMemory,
      usersRepositoryInMemory,
    );
  });

  it("should be able to list all courses", async () => {
    const listCourses = await listCoursesUseCase.execute(
      "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      {
        page: 1,
        registersPerPage: 10,
        filter: "",
      },
    );

    expect(listCourses).toHaveProperty("courses");
    expect(listCourses).toHaveProperty("totalCount");
  });
});
