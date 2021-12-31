import { Router } from "express";

import { ListStatesController } from "@modules/territory/useCases/listStates/ListStatesController";

const listStatesController = new ListStatesController();

const statesRoutes = Router();

statesRoutes.get("/", listStatesController.handle);

export { statesRoutes };
