import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { User } from "@modules/account/infra/typeorm/entities/User";
import { IGeneralListDTO } from "@utils/IGeneralListDTO";

import { IListUsersDTO } from "../dtos/IListUsersDTO";

interface IUsersRepository {
  save(data: ISaveUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  list(data: IGeneralListDTO): Promise<IListUsersDTO>;
  listByInstitutionId(institutionId: string): Promise<User[]>;
  listStudentsByCourseId(courseId: string): Promise<User[]>;
}
export { IUsersRepository };
