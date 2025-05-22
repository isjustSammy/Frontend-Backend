import express from "express";
import peliCon from "../Controllers/peliCon.js";
import multer from "multer"


const router = express.Router();

const upload= multer({dest: "public/"})


router.
route("/")
.get(peliCon.get)
.post(upload.single("img"),peliCon.post);


router.
route("/:id")
.put(upload.single("img"),peliCon.put)
.delete(peliCon.delete);

export default router;