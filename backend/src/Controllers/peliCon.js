import peliModel from "../models/Peliculas.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";


const peliCon={};

cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret,
  });

peliCon.get = async (req,res) =>{
    const Peli = await peliModel.find();
    res.json(Peli);
};

peliCon.post = async (req,res) =>{
    const {titulo,descripcion,director,genero,anio,duracion}=req.body;
    let imgUrl = "";
    if(req.file){
        const resul = await cloudinary.uploader.upload(req.file.path, {
            folder:"public",
            allowed_formats: ["png","jpeg","jpg"],
        });
        imgUrl= resul.secure_url;
    }
    const newPeli= new peliModel({titulo,descripcion,director,genero,anio,duracion,imgUrl});
    await newPeli.save();
    res.json({message: "pelicula guardada"});
};

peliCon.delete = async (req,res)=>{
    const deletePeli = await peliModel.findByIdAndDelete(req.params.id);
    if(!deletePeli){
        return res.status(404).json({message:"pelicula no encontrada"});
    }
    res.json({message: "pelicula eliminada con exito"})
};


peliCon.put = async (req,res) => {
    const {titulo,descripcion,director,genero,anio,duracion}=req.body;
    let imgUrl = "";
    if(req.file){
        const resul = await cloudinary.uploader.upload(req.file.path, {
            folder:"public",
            allowed_formats: ["png","jpeg","jpg"],
        });
        imgUrl= resul.secure_url;
    }

    await peliModel.findByIdAndUpdate(
        req.params.id,{
            titulo,
            descripcion,
            director,
            genero,
            anio,
            duracion,
            imgUrl
        },
        {new : true}
    );
    res.json({message: "pelicula actualizada con exito"});
};


export default peliCon;