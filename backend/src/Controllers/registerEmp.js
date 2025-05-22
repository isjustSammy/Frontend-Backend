import empModel from "../models/Empleados.js"
import jwt from "jsonwebtoken"; 
import bcryptjs from "bcryptjs"; 
import { config } from "../config.js";


const empCon = {};

empCon.RegisterEmp = async (req,res) =>{
    const {nombre,
        correo,
        contrasena,
        telefono,
        dirreccion,
        puesto,
        fehcaContra,
        salario,
        DUI}=req.body;

        try{
            const validacionUser = await empModel.findOne({correo})
            if(validacionUser){
                return res.json({message: "Empleado ya existente"})
            }

            const encriptarPassHash = await bcryptjs.hash(contrasena,10)

            const newemp= new empModel({
                nombre,
                correo,
                contrasena:encriptarPassHash,
                telefono,
                dirreccion,
                puesto,
                fehcaContra,
                salario,
                DUI : DUI || null
            });

            await newemp.save();


                jwt.sign(
                    { id: newemp._id },
                    config.JWT.secret,
                    { expiresIn: config.JWT.expiresIn },
                    (error, token) => {
                        if (error) console.log("error" + error)
        
                        res.cookie("authToken", token)
                        res.json({ message: "empleado guardado" })
                    }
        
                )
        }catch (error) {
            console.log("error: " + error);
            res.json({ message: "Error empleado no registrado"});
        }
};

export default empCon;