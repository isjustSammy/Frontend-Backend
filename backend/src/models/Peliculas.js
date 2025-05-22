import {Schema,model} from "mongoose";

const peliculaSchema = new Schema ({
    titulo:{
        type:String,
        require:true
    },
    descripcion:{
        type:String,
        require:true
    },
    director:{
        type:String,
        require:true
    },
    genero:{
        type:String,
        require:true
    },
    anio:{
        type:Number,
        rquire:true
    },
    duracion:{
        type:Number,
        rquire:true
    },
    img:{
        type:String,
        require:true
    }

},{
    timestamps:true,
    strict:false
});


export default model ("peliculas",peliculaSchema);