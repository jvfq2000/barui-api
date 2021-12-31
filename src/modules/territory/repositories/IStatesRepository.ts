import { State } from "../infra/typeorm/entities/State";

interface IStatesRepository {
  list(): Promise<State[]>;
  findById(id: string): Promise<State>;
}

export { IStatesRepository };
