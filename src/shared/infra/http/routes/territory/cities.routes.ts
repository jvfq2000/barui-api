import { Router } from "express";

import { ListCitiesByStateController } from "@modules/territory/useCases/listCities/ListCitiesByStateController";

const listCitiesByStateController = new ListCitiesByStateController();

const citiesRoutes = Router();

citiesRoutes.get("/", listCitiesByStateController.handle);

export { citiesRoutes };
