import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { UsersRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersTokensRepositoryInMemory";
import { CreateUserUseCase } from "@modules/account/useCases/createUser/CreateUserUseCase";
import { ISaveCourseDTO } from "@modules/activityRegulation/dtos/ISaveCourseDTO";
import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/ISaveInstitutionDTO";
import { CoursesRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/CoursesRepositoryInMemory";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory copy";
import { CreateCourseUseCase } from "@modules/activityRegulation/useCases/createCourse/CreateCourseUseCase";
import { CreateInstitutionUseCase } from "@modules/activityRegulation/useCases/createInstitution/CreateInstitutionUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let coursesRepositoryInMemory: CoursesRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createInstitutionUseCase: CreateInstitutionUseCase;
let createCourseUseCase: CreateCourseUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let refreshTokenUseCase: RefreshTokenUseCase;
let dateProvider: DayjsDateProvider;

describe("Refresh Token", () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
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

    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

    refreshTokenUseCase = new RefreshTokenUseCase(
      usersTokensRepositoryInMemory,
      usersRepositoryInMemory,
      dateProvider,
    );

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
    );
  });

  it("should be able to create a new token", async () => {
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

    const user: ISaveUserDTO = {
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

    const authenticate = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.identifier,
    });

    const { refreshToken } = authenticate;

    const newRefreshToken = await refreshTokenUseCase.execute(refreshToken);

    expect(newRefreshToken).toHaveProperty("token");
    expect(newRefreshToken).toHaveProperty("refreshToken");
  });

  it("should not be able to create a new token if refreshToken not exists", async () => {
    await expect(
      refreshTokenUseCase.execute("395133824845219"),
    ).rejects.toEqual(new AppError("Refresh token inválido!", 401));
  });
});
