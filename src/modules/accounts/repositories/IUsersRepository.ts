import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { IListUsersDTO } from "../dtos/IListUserDTO";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  list(
    page: number,
    registersPerPage: number,
    filter?: string,
  ): Promise<IListUsersDTO>;
}
export { IUsersRepository };
