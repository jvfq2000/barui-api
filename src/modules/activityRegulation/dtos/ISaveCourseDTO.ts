interface ISaveCourseDTO {
  id?: string;
  name: string;
  numberPeriods: number;
  institutionId?: string;
  isActive?: boolean;
}

export { ISaveCourseDTO };
