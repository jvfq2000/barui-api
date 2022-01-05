import { compare } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { UsersRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersTokensRepositoryInMemory";
import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";
import { CreateUserUseCase } from "@modules/account/useCases/createUser/CreateUserUseCase";
import { ISaveCourseDTO } from "@modules/activityRegulation/dtos/ISaveCourseDTO";
import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/ISaveInstitutionDTO";
import { CoursesRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/CoursesRepositoryInMemory";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory copy";
import { CreateCourseUseCase } from "@modules/activityRegulation/useCases/createCourse/CreateCourseUseCase";
import { CreateInstitutionUseCase } from "@modules/activityRegulation/useCases/createInstitution/CreateInstitutionUseCase";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

let dateProvider: IDateProvider;
let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let coursesRepositoryInMemory: CoursesRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: IUsersTokensRepository;
let createInstitutionUseCase: CreateInstitutionUseCase;
let createCourseUseCase: CreateCourseUseCase;
let createUserUseCase: CreateUserUseCase;
let resetPasswordUserUseCase: ResetPasswordUserUseCase;

describe("Reset Password", () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
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

    resetPasswordUserUseCase = new ResetPasswordUserUseCase(
      dateProvider,
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
    );
  });

  it("should be able to reset password user", async () => {
    const password = "tyeDPcR1";

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

    const token = uuidV4();
    const expiresDate = dateProvider.addHours(3);

    await usersTokensRepositoryInMemory.create({
      userId: user.id,
      refreshToken: token,
      expiresDate,
    });

    const newPassword = "8OWGEj0L";
    await resetPasswordUserUseCase.execute({ token, password: newPassword });
    const changedUser = await usersRepositoryInMemory.findById(user.id);

    expect(await compare(newPassword, changedUser.password)).toBe(true);
    expect(await compare(password, changedUser.password)).toBe(false);
  });

  it("should not be able to reset password user with token expired", async () => {
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
      name: "Eliza Waters",
      lastName: "Sallie Harper",
      email: "fosgoc@kejundo.pl",
      identifier: "39257058502",
      telephone: "(921) 583-5241",
      initialSemester: "1/2022",
      registration: "43073",
      accessLevel: "aluno",
      courseId: course.id,
      institutionId: institution.id,
    };

    await createUserUseCase.execute(
      "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      user,
    );

    user = await usersRepositoryInMemory.findByEmail(user.email);
    const token = uuidV4();
    const expiresDate = dateProvider.subtractHours(1);

    await usersTokensRepositoryInMemory.create({
      userId: user.id,
      refreshToken: token,
      expiresDate,
    });

    await expect(
      resetPasswordUserUseCase.execute({ token, password: "EpiptRk7" }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to reset password user with invalid token", async () => {
    await expect(
      resetPasswordUserUseCase.execute({
        token: "BOwVAJQZjoys7jI",
        password: "LMJfAoAc",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
