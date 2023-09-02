import { Router } from "express";
import controllerNegocio from "../controllers/controller.negocio.js"

const routeNegocio = Router();

routeNegocio.get("/negocio", controllerNegocio.Listar);
routeNegocio.get("/negocio/:id_negocio", controllerNegocio.ListarId);
routeNegocio.post("/negocio", controllerNegocio.Inserir);
routeNegocio.put("/negocio/:id_negocio", controllerNegocio.Editar);
routeNegocio.delete("/negocio/:id_negocio", controllerNegocio.Excluir);

export default routeNegocio;