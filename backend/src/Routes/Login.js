import express from "express";

import LoginCon from "../Controllers/Login.js";

const router = express.Router();

router.route("/").post(LoginCon.login);

export default router;