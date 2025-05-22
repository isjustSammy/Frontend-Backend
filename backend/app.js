import express from "express";
import PeliRoutes from "./src/Routes/PeliRoutes.js";
import empRoutes from "./src/Routes/empleadoRoutes.js";
import regiempRoutes from "./src/Routes/registerEmpRoutes.js";
import clienteRoutes from "./src/Routes/ClienteRoutes.js";
import registerCliente from "./src/Routes/registerClienteRoutes.js";
import Login from "./src/Routes/Login.js";
import RecoveryRoutes from "./src/Routes/RecoveryRoutes.js"
import Logout from "./src/Routes/LogoutRoutes.js";
import cookieParser from "cookie-parser";
import {validateAuthToken} from "./src/middlewares/validateAuthToken.js"
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
      origin: "http://localhost:5173", 
      credentials: true, 
    })
  );


app.use("/api/PeliRoutes",PeliRoutes);
app.use("/api/empleadoRoutes",validateAuthToken(["Admin"]),empRoutes);
app.use("/api/registerEmpRoutes",validateAuthToken(["Admin"]),regiempRoutes);
app.use("/api/ClienteRoutes",clienteRoutes);
app.use("/api/registerClienteRoutes",registerCliente);
app.use("/api/Login",Login);
app.use("/api/Logout",Logout);
app.use("/api/recoveryPassword",RecoveryRoutes);

export default app;

































































































































































