import { Router } from "express";

import { CreateChartController } from "@modules/activityRegulation/useCases/charts/createChart/CreateChartController";
import { FindChartByIdController } from "@modules/activityRegulation/useCases/charts/findChartById/FindChartByIdController";
import { ListChartsController } from "@modules/activityRegulation/useCases/charts/listCharts/ListChartsController";
import { ModifyIsActiveChartController } from "@modules/activityRegulation/useCases/charts/modifyIsActiveChart/ModifyIsActiveChartController";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { ensureInstitutionAdmin } from "../../middlewares/ensureInstitutionAdmin";

const listChartsController = new ListChartsController();
const createChartController = new CreateChartController();
const findChartByIdController = new FindChartByIdController();
const modifyIsActiveChartController = new ModifyIsActiveChartController();

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

chartsRoutes.patch(
  "/is-active",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  modifyIsActiveChartController.handle,
);

export { chartsRoutes };
