import { Router } from "express";
import controllerEtapas from "../controllers/controller.etapas.js"

const routeEtapas = Router();

routeEtapas.get("/etapas", controllerEtapas.Listar);

export default routeEtapas;