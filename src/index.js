import express from "express";
import cors from "cors";
import basicauth from "express-basic-auth";
import dotenv from "dotenv";
import routeEtapas from "./routes/route.etapas.js";
import routeNegocio from "./routes/route.negocio.js";
import routeDashboard from "./routes/route.dashboard.js";

dotenv.config();

const app = express();
const apiUser = process.env.API_USER;
const apiPassword = process.env.API_PASSWORD;
const port = 3001;

app.use(express.json());
app.use(cors());

app.use(basicauth({
    authorizer: function(usuario, senha){
        return basicauth.safeCompare(usuario, apiUser) && basicauth.safeCompare(senha, apiPassword);
    }
}));

app.use(routeEtapas);
app.use(routeNegocio);
app.use(routeDashboard)

app.listen(port, () => {
    console.log("Servidor rodando na porta: " + port);
})