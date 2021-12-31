interface IUserResponseDTO {
  id: string;
  name: string;
  lastName: string;
  email: string;
  identifier: string;
  createdAt: Date;
  avatar: string;
  accessLevel: string;
  isActive: boolean;
  avatarUrl: string;
}

export { IUserResponseDTO };
