import clienteModelo from "../models/Cliente.js"
import empleadoModelo from "../models/Empleados.js"
import jwt from "jsonwebtoken"; 
import bcrypt from "bcryptjs";
import { config } from "../config.js";

const LoginCon = {};

LoginCon.login = async (req,res) =>{

      const {correo,contrasena}=req.body;

      try{

       let userFound;
       let userType;

       if(correo === config.ADMIN.emailAdmin && contrasena === config.ADMIN.password){
        userType = "Admin"
        userFound = {_id: "admin"}
       }else{
        userFound = await empleadoModelo.findOne({correo})
        userType = "empleado"
       }if(!userFound){
        userFound = await clienteModelo.findOne({correo})
        userType = "cliente"
       }
       if (!userFound) {
        return res.json({ message: "usuario no encontrado" });
    }

    if(userType !== "Admin"){
        const isMatch = await bcrypt.compare(contrasena,userFound.contrasena)
        if(!isMatch){
            return res.json({ message : "Contraseña mala como tu ex"})
        }
    }
         jwt.sign(
        { id: userFound._id, userType },
        config.JWT.secret,
        { expiresIn: config.JWT.expiresIn },
        (error, token) => {
            if (error) console.log("error" + error)
            res.cookie("authToken", token)
            res.json({ message: "Login completado" })
        }
    )

    }catch (error) {

        console.log("error" + error);
    }
}

export default LoginCon;