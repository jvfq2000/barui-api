import { UsersRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersRepositoryInMemory";
import { CoursesRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/CoursesRepositoryInMemory";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory";
import { CitiesRepositoryInMemory } from "@modules/territory/repositories/inMemory/CitiesRepositoryInMemory";
import { StatesRepositoryInMemory } from "@modules/territory/repositories/inMemory/StatesRepositoryInMemory";

import { ListUsersUseCase } from "./ListUsersUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let coursesRepositoryInMemory: CoursesRepositoryInMemory;
let citiesRepositoryInMemory: CitiesRepositoryInMemory;
let statesRepositoryInMemory: StatesRepositoryInMemory;
let listUsersUseCase: ListUsersUseCase;

describe("List Users", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    institutionsRepositoryInMemory = new InstitutionsRepositoryInMemory();
    coursesRepositoryInMemory = new CoursesRepositoryInMemory();
    citiesRepositoryInMemory = new CitiesRepositoryInMemory();
    statesRepositoryInMemory = new StatesRepositoryInMemory();

    listUsersUseCase = new ListUsersUseCase(
      usersRepositoryInMemory,
      institutionsRepositoryInMemory,
      coursesRepositoryInMemory,
      citiesRepositoryInMemory,
      statesRepositoryInMemory,
    );
  });

  it("should be able to list all users", async () => {
    const listUsers = await listUsersUseCase.execute({
      userId: "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      page: 1,
      registersPerPage: 10,
      filter: "",
      isActive: true,
    });

    expect(listUsers).toHaveProperty("users");
    expect(listUsers).toHaveProperty("totalCount");
  });
});
