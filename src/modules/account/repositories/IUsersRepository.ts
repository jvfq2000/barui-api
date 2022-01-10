import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { User } from "@modules/account/infra/typeorm/entities/User";

import { IListUsersDTO } from "../dtos/IListUsersDTO";

interface IUsersRepository {
  save(data: ISaveUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  list(
    page: number,
    registersPerPage: number,
    filter: string,
    institutionId: string,
  ): Promise<IListUsersDTO>;
}
export { IUsersRepository };
