interface ICreateUserDTO {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  password?: string;
  accessLevel?: string;
  identifier?: string;
  isActive?: boolean;
  avatar?: string;
}

export { ICreateUserDTO };
