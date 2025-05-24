import express from "express";
import empCon from "../Controllers/empleadoCon.js";


const router = express.Router()

router. 
route("/")
.get(empCon.get)
.post(empCon.post);

router. 
route("/:id")
.delete(empCon.delete)
.put(empCon.put);

export default router;