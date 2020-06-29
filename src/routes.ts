import express from "express";

import PointController from "./controllers/PointController";
import ItemController from "./controllers/ItemController";

const routes = express.Router();

routes.get("/items", ItemController.index);

routes.get("/points/:id", PointController.show);
routes.post("/points", PointController.create);

export default routes;
