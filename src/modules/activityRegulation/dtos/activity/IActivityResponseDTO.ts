interface IActivityResponseDTO {
  id: string;
  name: string;
  maxHours: number;
  minHours: number;
  isActive: boolean;
  createdAt: Date;

  chartId: string;
  chartName: string;

  categoryId: string;
  categoryName: string;
}

export { IActivityResponseDTO };
