interface IInstitutionResponseDTO {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;

  cityId: string;
  cityName: string;

  stateId: string;
  stateName: string;
  stateAcronym: string;
}

export { IInstitutionResponseDTO };
