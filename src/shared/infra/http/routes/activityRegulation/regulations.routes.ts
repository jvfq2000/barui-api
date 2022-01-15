import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateRegulationController } from "@modules/activityRegulation/useCases/regulations/createRegulation/CreateRegulationController";
import { FindRegulationByIdController } from "@modules/activityRegulation/useCases/regulations/findCourseById/FindRegulationByIdController";
import { ListRegulationsController } from "@modules/activityRegulation/useCases/regulations/listRegulations/ListRegulationsController";
import { ModifyIsActiveRegulationController } from "@modules/activityRegulation/useCases/regulations/modifyIsActiveRegulation/ModifyIsActiveRegulationController";
import { UpdateRegulationController } from "@modules/activityRegulation/useCases/regulations/updateRegulation/UpdateRegulationController";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { ensureInstitutionAdmin } from "../../middlewares/ensureInstitutionAdmin";

const listRegulationsController = new ListRegulationsController();
const createRegulationController = new CreateRegulationController();
const findRegulationByIdController = new FindRegulationByIdController();
const updateRegulationController = new UpdateRegulationController();
const modifyIsActiveRegulationController =
  new ModifyIsActiveRegulationController();

const uploadRegulation = multer(uploadConfig);

const regulationsRoutes = Router();

regulationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  uploadRegulation.single("file"),
  createRegulationController.handle,
);

regulationsRoutes.get(
  "/",
  ensureAuthenticated,
  listRegulationsController.handle,
);

regulationsRoutes.get(
  "/by-id",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  findRegulationByIdController.handle,
);

regulationsRoutes.put(
  "/",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  uploadRegulation.single("file"),
  updateRegulationController.handle,
);

regulationsRoutes.patch(
  "/is-active",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  modifyIsActiveRegulationController.handle,
);

export { regulationsRoutes };
