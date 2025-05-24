import express from "express";
import clienteCon from "../Controllers/clienteCon.js";

const router=express.Router();

router. 
route("/")
.get(clienteCon.get)
.post(clienteCon.post);

router.route("/:id").put(clienteCon.put).delete(clienteCon.delete);

export default router;