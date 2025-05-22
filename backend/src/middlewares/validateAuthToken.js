import jwt from "jsonwebtoken";
import { config } from "../config.js";


export const validateAuthToken = (allowedUserTypes = [])=>{
return (req,res,next) =>{
    try{
        
         const {authToken} = req.cookies;

         if(!authToken){
            res.json({message: "No tienes token, necesitas iniciar sesion"});
         }

         const decoded = jwt.verify(authToken,config.JWT.secret);

         if(!allowedUserTypes.includes(decoded.userType)){
            return res.json({message: "Acceso denegado"})
         }

          next()

    }catch (error){
     console.log({message: "error"+error})
    }
};
};