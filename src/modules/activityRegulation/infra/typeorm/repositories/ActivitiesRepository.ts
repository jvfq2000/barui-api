import { getRepository, Repository } from "typeorm";

import { ISaveActivityDTO } from "@modules/activityRegulation/dtos/activity/ISaveActivityDTO";
import { IActivitiesRepository } from "@modules/activityRegulation/repositories/IActivitiesRepository";

import { Activity } from "../entities/Activity";

class ActivitiesRepository implements IActivitiesRepository {
  private repository: Repository<Activity>;

  constructor() {
    this.repository = getRepository(Activity);
  }

  async save(data: ISaveActivityDTO[]): Promise<void> {
    const activities = data.map(activity => {
      const { id, name, maxHours, minHours, isActive, chartId, categoryId } =
        activity;

      return this.repository.create({
        id,
        name,
        maxHours,
        minHours,
        isActive,
        chartId,
        categoryId,
      });
    });

    await this.repository.save(activities);
  }

  async findById(id: string): Promise<Activity> {
    const activity = await this.repository.findOne(id);
    return activity;
  }

  async findByNameAndChartIdAndCategoryId(
    name: string,
    chartId: string,
    categoryId: string,
  ): Promise<Activity> {
    const activity = await this.repository.findOne({
      name,
      chartId,
      categoryId,
    });

    return activity;
  }

  async listByChartIdAndCategoryId(
    chartId: string,
    categoryId: string,
  ): Promise<Activity[]> {
    const activities = await this.repository.find({ chartId, categoryId });
    return activities;
  }

  async listByChartId(chartId: string): Promise<Activity[]> {
    const activities = await this.repository.find({ chartId });
    return activities;
  }
}

export { ActivitiesRepository };
