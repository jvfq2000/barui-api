import { Institution } from "../infra/typeorm/entities/Institution";

interface IListInstitutionsDTO {
  institutions: Institution[];
  totalCount: number;
}

export { IListInstitutionsDTO };
