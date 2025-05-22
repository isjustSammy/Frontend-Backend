import { Schema ,model} from "mongoose"


const ClienteSchema = new Schema({
    nombre:{
        type:String,
        require:true
    },
    correo:{
        type:String,
        require:true
    },
    contrasena:{
        type:String,
        require:true
    },
    telefono:{
        type:String,require:true
    },
    dirrecion:{
        type:String,
        require:true
    },
    DUI:{
        type:String,
        require:true
    }
},{timestamps:true,
    strict:false
});


export default model ("Cliente",ClienteSchema);