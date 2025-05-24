import clienteModel from "../models/Cliente.js";


const clienteCon ={};

clienteCon.get = async (req,res) =>{
    const cliente = await clienteModel.find();
    res.json(cliente);
}

clienteCon.post = async (req,res) => {
  const {nombre,correo,contrasena,telefono,DUI}=req.body
  const newCliente = new clienteModel({nombre,correo,contrasena,telefono,DUI});
  await newCliente.save();
      res.json({message: "cliente registrado"});
}

clienteCon.delete = async (req,res) =>{
    const deleteCliente = await clienteModel.findByIdAndDelete(req.params.id);
    if(!deleteCliente){
        res.status(404).json({message: "Cliente no encontrado"});
    }
    res.json({message: "Cliente eliminado con exito"});
};

clienteCon.put = async (req, res) => {
  const { nombre, correo, contrasena, telefono, dirrecion, DUI } = req.body;


 

  await clienteModel.findByIdAndUpdate(
    req.params.id,
    {
      nombre,
      correo,
      contrasena,
      telefono,
      dirrecion,
      DUI,
    },
    { new: true }
  );

  res.json({ message: "Cliente actualizado" });
};

export default clienteCon;