import express from "express";
import passworRecovery from "../Controllers/Recuperar.js";

const router=express.Router();

router.route("/requestCode").post(passworRecovery.requestCode);
router.route("/verifyCode").post(passworRecovery.verifyCode);
router.route("/newPassword").post(passworRecovery.newPass);

export default router;