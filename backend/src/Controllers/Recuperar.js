import clientemodelo from "../models/Cliente.js";
import empleadomodelo from "../models/Empleados.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail, HTMLRecoveryEmail } from "../utils/RecoveryPass.js";
import { config } from "../config.js";

const passworRecovery = {};

// ✅ Paso 1: Solicitud de código de recuperación
passworRecovery.requestCode = async (req, res) => {
  const { correo } = req.body;

  try {
    let userFound = await clientemodelo.findOne({ correo });
    let usertype = "cliente";

    if (!userFound) {
      userFound = await empleadomodelo.findOne({ correo });
      usertype = "empleado";
    }

    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const codex = Math.floor(10000 + Math.random() * 90000).toString();

    const token = jwt.sign(
      { correo, codex, usertype, verified: false },
      config.JWT.secret,
      { expiresIn: "20m" }
    );

    res.cookie("tokenRecoveryCode", token, {
      maxAge: 20 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
    });

    await sendEmail(
      correo,
      "Tu código de verificación",
      "Hola, este es tu código de verificación para recuperar tu contraseña.",
      HTMLRecoveryEmail(codex)
    );

    res.json({ message: "Correo enviado con el código de verificación" });
  } catch (error) {
    console.error("Error en requestCode:", error);
    res.status(500).json({ message: "Error al solicitar el código" });
  }
};

// ✅ Paso 2: Verificar el código recibido
passworRecovery.verifyCode = async (req, res) => {
  const { codex } = req.body;

  try {
    const token = req.cookies.tokenRecoveryCode;

    if (!token) {
      return res.status(401).json({ message: "Token no encontrado" });
    }

    const decoded = jwt.verify(token, config.JWT.secret);

    if (decoded.codex !== codex) {
      return res.status(400).json({ message: "Código inválido" });
    }

    const newToken = jwt.sign(
      {
        correo: decoded.correo,
        codex: decoded.codex,
        usertype: decoded.usertype,
        verified: true,
      },
      config.JWT.secret,
      { expiresIn: "20m" }
    );

    res.cookie("tokenRecovery", newToken, {
      maxAge: 20 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
    });

    res.json({ message: "Código verificado correctamente" });
  } catch (error) {
    console.error("Error en verifyCode:", error);
    res.status(500).json({ message: "Error al verificar el código" });
  }
};

// ✅ Paso 3: Crear nueva contraseña
passworRecovery.newPass = async (req, res) => {
  const { newPass } = req.body;

  try {
    const token = req.cookies.tokenRecovery;

    if (!token) {
      return res.status(401).json({ message: "Token no encontrado" });
    }

    const decoded = jwt.verify(token, config.JWT.secret);

    if (!decoded.verified) {
      return res.status(403).json({ message: "Código no verificado" });
    }

    const { correo, usertype } = decoded;
    const hashedPassword = await bcryptjs.hash(newPass, 10);
    let updateUser;

    if (usertype === "cliente") {
      updateUser = await clientemodelo.findOneAndUpdate(
        { correo },
        { contrasena: hashedPassword },
        { new: true }
      );
    } else if (usertype === "empleado") {
      updateUser = await empleadomodelo.findOneAndUpdate(
        { correo },
        { contrasena: hashedPassword },
        { new: true }
      );
    }

    if (!updateUser) {
      return res.status(404).json({ message: "No se pudo actualizar la contraseña" });
    }

    res.clearCookie("tokenRecovery");
    res.clearCookie("tokenRecoveryCode");

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error en newPass:", error);
    res.status(500).json({ message: "Error al actualizar contraseña" });
  }
};

export default passworRecovery;
