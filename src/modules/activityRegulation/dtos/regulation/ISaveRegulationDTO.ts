interface ISaveRegulationDTO {
  id?: string;
  name: string;
  file: string;
  inForceFrom: string;
  courseId: string;
  isActive?: boolean;
}

export { ISaveRegulationDTO };
