import express from "express";
import empCon from "../Controllers/registerEmp.js";

const router= express.Router();

router. 
route("/")
.post(empCon.RegisterEmp);


export default  router;