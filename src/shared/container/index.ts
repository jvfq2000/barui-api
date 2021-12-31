import { container } from "tsyringe";

import { UsersRepository } from "@modules/account/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/account/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";
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
