interface ISaveActivityDTO {
  id?: string;
  name: string;
  maxHours: number;
  minHours: number;
  chartId: string;
  categoryId: string;
  isActive?: boolean;
}

export { ISaveActivityDTO };
