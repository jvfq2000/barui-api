import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { UsersRepositoryInMemory } from "@modules/account/repositories/inMemory/UsersRepositoryInMemory";
import { ISaveCourseDTO } from "@modules/activityRegulation/dtos/course/ISaveCourseDTO";
import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/institution/ISaveInstitutionDTO";
import { CoursesRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/CoursesRepositoryInMemory";
import { InstitutionsRepositoryInMemory } from "@modules/activityRegulation/repositories/inMemory/InstitutionsRepositoryInMemory copy";
import { CreateCourseUseCase } from "@modules/activityRegulation/useCases/courses/createCourse/CreateCourseUseCase";
import { CreateInstitutionUseCase } from "@modules/activityRegulation/useCases/institutions/createInstitution/CreateInstitutionUseCase";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "./CreateUserUseCase";

let institutionsRepositoryInMemory: InstitutionsRepositoryInMemory;
let coursesRepositoryInMemory: CoursesRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createInstitutionUseCase: CreateInstitutionUseCase;
let createCourseUseCase: CreateCourseUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
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
  });

  it("should be able to create a new user", async () => {
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

    const userCreated = await usersRepositoryInMemory.findByEmail(user.email);

    expect(userCreated).toHaveProperty("id");
  });

  it("should not be able to create a new user with email exists", async () => {
    expect(async () => {
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

      const user: ISaveUserDTO = {
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

      await createUserUseCase.execute(
        "a79e1e38-62bf-5223-9be4-f5081c33eec7",
        user,
      );
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new user with institution non exists", async () => {
    expect(async () => {
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

      const user: ISaveUserDTO = {
        name: "Calvin Mann",
        lastName: "Stephen Dixon",
        email: "al@bimiffak.bb",
        identifier: "70506036452",
        telephone: "(921) 583-5241",
        initialSemester: "1/2022",
        registration: "05681",
        accessLevel: "aluno",
        courseId: course.id,
        institutionId: "c2bd3975-b974-56ac-9c3e-dae3c260dda1",
      };

      await createUserUseCase.execute(
        "a79e1e38-62bf-5223-9be4-f5081c33eec7",
        user,
      );

      await createUserUseCase.execute(
        "a79e1e38-62bf-5223-9be4-f5081c33eec7",
        user,
      );
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new user with institution uninformed", async () => {
    expect(async () => {
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

      const user: ISaveUserDTO = {
        name: "Calvin Mann",
        lastName: "Stephen Dixon",
        email: "al@bimiffak.bb",
        identifier: "70506036452",
        telephone: "(921) 583-5241",
        initialSemester: "1/2022",
        registration: "05681",
        accessLevel: "aluno",
        courseId: course.id,
        institutionId: undefined,
      };

      await createUserUseCase.execute(
        "a79e1e38-62bf-5223-9be4-f5081c33eec7",
        user,
      );

      await createUserUseCase.execute(
        "a79e1e38-62bf-5223-9be4-f5081c33eec7",
        user,
      );
    }).rejects.toBeInstanceOf(AppError);
  });
});
