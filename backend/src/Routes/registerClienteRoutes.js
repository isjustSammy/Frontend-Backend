import express from "express";
import registerCliente from "../Controllers/registerCliente.js"

const router = express.Router();

router.route("/").post(registerCliente.register);

export default router;