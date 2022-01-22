import { IActivityResponseDTO } from "../dtos/activity/IActivityResponseDTO";
import { IChartResponseDTO } from "../dtos/chart/IChartResponseDTO";
import { Chart } from "../infra/typeorm/entities/Chart";

class ChartMap {
  static toDTO(
    chart: Chart,
    activities: IActivityResponseDTO[],
  ): IChartResponseDTO {
    const chartDTO: IChartResponseDTO = {
      id: chart.id,
      name: chart.name,
      inForceFrom: chart.inForceFrom,
      isActive: chart.isActive,
      createdAt: chart.createdAt,

      courseId: chart.courseId,
      courseName: chart.course.name,

      activities,
    };

    return chartDTO;
  }
}

export { ChartMap };
