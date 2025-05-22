import clienteModel from "../models/Cliente.js";
import bcryptjs from "bcryptjs";


const clienteCon ={};

clienteCon.get = async (req,res) =>{
    const cliente = await clienteModel.find();
    res.json(cliente);
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

  let passHashed = contrasena;

  if (contrasena) {
    passHashed = await bcryptjs.hash(contrasena, 10);
  }

  await clienteModel.findByIdAndUpdate(
    req.params.id,
    {
      nombre,
      correo,
      contrasena: passHashed,
      telefono,
      dirrecion,
      DUI,
    },
    { new: true }
  );

  res.json({ message: "Cliente actualizado" });
};

export default clienteCon;