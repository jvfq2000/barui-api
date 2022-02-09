import { container } from "tsyringe";

import { UsersRepository } from "@modules/account/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/account/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";
import { ActivitiesRepository } from "@modules/activityRegulation/infra/typeorm/repositories/ActivitiesRepository";
import { ActivityCategoriesRepository } from "@modules/activityRegulation/infra/typeorm/repositories/ActivityCategoriesRepository";
import { ChartsRepository } from "@modules/activityRegulation/infra/typeorm/repositories/ChartsRepository";
import { CoursesRepository } from "@modules/activityRegulation/infra/typeorm/repositories/CoursesRepository";
import { InstitutionsRepository } from "@modules/activityRegulation/infra/typeorm/repositories/InstitutionsRepository";
import { RegulationsRepository } from "@modules/activityRegulation/infra/typeorm/repositories/RegulationsRepository";
import { IActivitiesRepository } from "@modules/activityRegulation/repositories/IActivitiesRepository";
import { IActivityCategoriesRepository } from "@modules/activityRegulation/repositories/IActivityCategoriesRepository";
import { IChartsRepository } from "@modules/activityRegulation/repositories/IChartsRepository";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { IRegulationsRepository } from "@modules/activityRegulation/repositories/IRegulationsRepository";
import { HistoricStudentActivitiesRepository } from "@modules/studentActivity/infra/typeorm/repositories/HistoricStudentActivitiesRepository";
import { StudentActivitiesRepository } from "@modules/studentActivity/infra/typeorm/repositories/StudentActivitiesRepository";
import { IHistoricStudentActivitiesRepository } from "@modules/studentActivity/repositories/IHistoricStudentActivitiesRepository";
import { IStudentActivitiesRepository } from "@modules/studentActivity/repositories/IStudentActivitiesRepository";
import { CitiesRepository } from "@modules/territory/infra/typeorm/repositories/CitiesRepository";
import { StatesRepository } from "@modules/territory/infra/typeorm/repositories/StateRepository";
import { ICitiesRepository } from "@modules/territory/repositories/ICitiesRepository";
import { IStatesRepository } from "@modules/territory/repositories/IStatesRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository,
);

container.registerSingleton<IStatesRepository>(
  "StatesRepository",
  StatesRepository,
);

container.registerSingleton<ICitiesRepository>(
  "CitiesRepository",
  CitiesRepository,
);

container.registerSingleton<IInstitutionsRepository>(
  "InstitutionsRepository",
  InstitutionsRepository,
);

container.registerSingleton<ICoursesRepository>(
  "CoursesRepository",
  CoursesRepository,
);

container.registerSingleton<IRegulationsRepository>(
  "RegulationsRepository",
  RegulationsRepository,
);

container.registerSingleton<IActivityCategoriesRepository>(
  "ActivityCategoriesRepository",
  ActivityCategoriesRepository,
);

container.registerSingleton<IChartsRepository>(
  "ChartsRepository",
  ChartsRepository,
);

container.registerSingleton<IActivitiesRepository>(
  "ActivitiesRepository",
  ActivitiesRepository,
);

container.registerSingleton<IStudentActivitiesRepository>(
  "StudentActivitiesRepository",
  StudentActivitiesRepository,
);

container.registerSingleton<IHistoricStudentActivitiesRepository>(
  "HistoricStudentActivitiesRepository",
  HistoricStudentActivitiesRepository,
);
