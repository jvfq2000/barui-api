interface ISaveUserDTO {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  identifier: string;
  telephone?: string;
  initialSemester?: string;
  registration?: string;
  avatar?: string;
  password?: string;
  accessLevel: string;
  courseId?: string;
  institutionId?: string;
  isActive?: boolean;
}

export { ISaveUserDTO };
