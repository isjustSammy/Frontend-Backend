import jwt from "jsonwebtoken"; 
import bcryptjs from "bcryptjs"; 
import { config } from "../config.js";
import clienteModel from "../models/Cliente.js";

const registerCliente ={};

registerCliente.register = async (req,res) => {
    const {nombre,correo,contrasena,telefono,dirrecion,DUI}=req.body;

    try{
        const validarCliente = await clienteModel.findOne({correo})
        if(validarCliente){
            return res.json({message: "Cliente ya existente"});
        };

        const encriptarContraHash = await bcryptjs.hash(contrasena,10);

        const newCliente =  new clienteModel ({nombre,correo,contrasena:encriptarContraHash,telefono,dirrecion,DUI: DUI|| null});

        await newCliente.save();

        jwt.sign(
            { id: newCliente._id },
            config.JWT.secret,
            { expiresIn: config.JWT.expiresIn },
            (error, token) => {
                if (error) console.log("error" + error)

                res.cookie("authToken", token)
                res.json({ message: "cliente guardado" })
            }

        )
    }catch (error) {
        console.log("error: " + error);
        res.json({ message: "Error empleado no registrado"});
    }
};

export default registerCliente;