import empModel from "../models/Empleados.js"


const empCon={};

empCon.get = async (req,res) =>{
    const empleado = await empModel.find();
    res.json(empleado);
}

empCon.post = async (req,res) => {
  const {nombre,correo,contrasena,telefono,DUI,dirreccion,puesto,fehcaContra,salario}=req.body
  const newEmpleado = new empModel({nombre,correo,contrasena,telefono,DUI,dirreccion,puesto,fehcaContra,salario});
  await newEmpleado.save();
      res.json({message: "empleado registrado"});
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


  await empModel.findByIdAndUpdate(
    req.params.id,
    {
      nombre,
      correo,
      contrasena,
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