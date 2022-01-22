import { Router } from "express";

import { CreateChartController } from "@modules/activityRegulation/useCases/charts/createChart/CreateChartController";
import { ListChartsController } from "@modules/activityRegulation/useCases/charts/listCharts/ListChartsController";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { ensureInstitutionAdmin } from "../../middlewares/ensureInstitutionAdmin";

const listChartsController = new ListChartsController();
const createChartController = new CreateChartController();

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

export { chartsRoutes };
