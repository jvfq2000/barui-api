import { User } from "../infra/typeorm/entities/User";

interface IListUsersDTO {
  users: User[];
  totalCount: number;
}

export { IListUsersDTO };
