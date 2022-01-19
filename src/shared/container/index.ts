import { container } from "tsyringe";

import { UsersRepository } from "@modules/account/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/account/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";
import { ActivityCategoriesRepository } from "@modules/activityRegulation/infra/typeorm/repositories/ActivityCategoriesRepository";
import { CoursesRepository } from "@modules/activityRegulation/infra/typeorm/repositories/CoursesRepository";
import { InstitutionsRepository } from "@modules/activityRegulation/infra/typeorm/repositories/InstitutionsRepository";
import { RegulationsRepository } from "@modules/activityRegulation/infra/typeorm/repositories/RegulationsRepository";
import { IActivityCategoriesRepository } from "@modules/activityRegulation/repositories/IActivityCategoriesRepository";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { IRegulationsRepository } from "@modules/activityRegulation/repositories/IRegulationsRepository";
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
