import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { UsersRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersRepositoryInMemory";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ISaveCourseDTO } from "@modules/activityRegulation/dtos/ISaveCourseDTO";
import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/ISaveInstitutionDTO";
import { CoursesRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/CoursesRepositoryInMemory";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory copy";
import { CreateCourseUseCase } from "@modules/activityRegulation/useCases/createCourse/CreateCourseUseCase";
import { CreateInstitutionUseCase } from "@modules/activityRegulation/useCases/createInstitution/CreateInstitutionUseCase";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ProfileUserUseCase } from "./ProfileUserUseCase";

let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let coursesRepositoryInMemory: CoursesRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createInstitutionUseCase: CreateInstitutionUseCase;
let createCourseUseCase: CreateCourseUseCase;
let createUserUseCase: CreateUserUseCase;
let profileUserUseCase: ProfileUserUseCase;

describe("Profile User", () => {
  beforeEach(() => {
    institutionsRepositoryInMemory = new InstitutionsRepositoryInMemory();
    coursesRepositoryInMemory = new CoursesRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    createInstitutionUseCase = new CreateInstitutionUseCase(
      institutionsRepositoryInMemory,
    );

    createCourseUseCase = new CreateCourseUseCase(
      coursesRepositoryInMemory,
      institutionsRepositoryInMemory,
      usersRepositoryInMemory,
    );

    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      institutionsRepositoryInMemory,
    );

    profileUserUseCase = new ProfileUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to access profile user", async () => {
    let institution: ISaveInstitutionDTO = {
      cityId: "48c47ca1-1532-5325-a9e3-ff1a0cdea5f9",
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

    let user: ISaveUserDTO = {
      name: "Emily Dixon",
      lastName: "Jimmy Hopkins",
      email: "vojwacle@ku.ae",
      identifier: "24233361131",
      telephone: "(921) 583-5241",
      initialSemester: "1/2022",
      registration: "31191",
      accessLevel: "aluno",
      courseId: course.id,
      institutionId: institution.id,
    };

    await createUserUseCase.execute(
      "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      user,
    );

    user = await usersRepositoryInMemory.findByEmail(user.email);

    const profile = await profileUserUseCase.execute(user.id);

    expect(profile).toHaveProperty("id");
  });
});