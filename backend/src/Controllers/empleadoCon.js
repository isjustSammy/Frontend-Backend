import empModel from "../models/Empleados.js"
import bcryptjs from "bcryptjs";


const empCon={};

empCon.get = async (req,res) =>{
    const empleado = await empModel.find();
    res.json(empleado);
}

empCon.put = async (req, res) => {
  const {
    nombre,
    correo,
    contrasena,
    telefono,
    dirreccion,
    puesto,
    fehcaContra,
    salario,
    DUI,
  } = req.body;

  let passHashed = contrasena;

  if (contrasena) {
    passHashed = await bcryptjs.hash(contrasena, 10);
  }

  await empModel.findByIdAndUpdate(
    req.params.id,
    {
      nombre,
      correo,
      contrasena: passHashed,
      telefono,
      dirreccion,
      puesto,
      fehcaContra,
      salario,
      DUI,
    },
    { new: true }
  );

  res.json({ message: "Empleado actualizado con éxito" });
};

empCon.delete = async (req,res) =>{
    const deleteemp = await empModel.findByIdAndDelete(req.params.id);
    if(!deleteemp){
        return res.status(404).json({message:"pelicula no encontrada"});
    }
    res.json({message: "empleado eliminado con exito"});
};

export default empCon;