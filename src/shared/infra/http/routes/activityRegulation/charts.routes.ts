import { Router } from "express";

import { CreateChartController } from "@modules/activityRegulation/useCases/charts/createChart/CreateChartController";
import { FindActivitiesByChartIdAndCategoryIdController } from "@modules/activityRegulation/useCases/charts/findActivitiesByChartIdAndCategoryId/FindActivitiesByChartIdAndCategoryIdController";
import { FindChartByIdController } from "@modules/activityRegulation/useCases/charts/findChartById/FindChartByIdController";
import { FindChartByStudentIdController } from "@modules/activityRegulation/useCases/charts/findChartByStudentId/FindChartByStudentIdController";
import { ListChartsController } from "@modules/activityRegulation/useCases/charts/listCharts/ListChartsController";
import { ModifyIsActiveChartController } from "@modules/activityRegulation/useCases/charts/modifyIsActiveChart/ModifyIsActiveChartController";
import { UpdateChartController } from "@modules/activityRegulation/useCases/charts/updateChart/UpdateChartController";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { ensureInstitutionAdmin } from "../../middlewares/ensureInstitutionAdmin";

const listChartsController = new ListChartsController();
const createChartController = new CreateChartController();
const updateChartController = new UpdateChartController();
const findChartByIdController = new FindChartByIdController();
const findChartByStudentIdController = new FindChartByStudentIdController();
const modifyIsActiveChartController = new ModifyIsActiveChartController();
const findActivitiesByChartIdAndCategoryIdController =
  new FindActivitiesByChartIdAndCategoryIdController();

const chartsRoutes = Router();

chartsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  createChartController.handle,
);

chartsRoutes.get(
  "/",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  listChartsController.handle,
);

chartsRoutes.get(
  "/by-id",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  findChartByIdController.handle,
);

chartsRoutes.get(
  "/by-student-id",
  ensureAuthenticated,
  findChartByStudentIdController.handle,
);

chartsRoutes.get(
  "/activities",
  ensureAuthenticated,
  findActivitiesByChartIdAndCategoryIdController.handle,
);

chartsRoutes.put(
  "/",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  updateChartController.handle,
);

chartsRoutes.patch(
  "/is-active",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  modifyIsActiveChartController.handle,
);

export { chartsRoutes };
