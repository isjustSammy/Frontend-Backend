import express from "express"
import LogoutCon from "../Controllers/Logout.js";

const router = express.Router();

router.route("/").post(LogoutCon.logout);

export default router;
