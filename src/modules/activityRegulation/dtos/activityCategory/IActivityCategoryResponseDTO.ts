interface IActivityCategoryResponseDTO {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;

  institutionId: string;
  institutionName: string;
}

export { IActivityCategoryResponseDTO };
