import {Schema,model} from "mongoose";

const empleadoSchema = new Schema({
    nombre:{
        type:String
    },
    correo:{
        type:String
    },
    contrasena:{
        type:String
    },
    telefono:{
        type:String,
    },
    dirreccion:{
        type:String
    },
    puesto:{
        type:String
    },
    fehcaContra:{
        type:String
    },
    salario:{
        type:Number
    },
    DUI:{
        type:String
    }
},{
    timestamps:true,
    strict:false
});

export default model ("Empleados",empleadoSchema);