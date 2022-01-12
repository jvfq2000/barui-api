import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { User } from "@modules/account/infra/typeorm/entities/User";
import { IGeneralListDTO } from "@utils/IGeneralListDTO";

import { IListUsersDTO } from "../dtos/IListUsersDTO";

interface IUsersRepository {
  save(data: ISaveUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  list({
    userId,
    institutionId,
    page,
    registersPerPage,
    filter,
    isActive,
  }: IGeneralListDTO): Promise<IListUsersDTO>;
}
export { IUsersRepository };
