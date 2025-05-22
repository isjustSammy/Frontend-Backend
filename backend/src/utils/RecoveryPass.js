import nodemialer from "nodemailer";
import {config} from "../config.js";


const trans = nodemialer.createTransport({
    host: "smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user: config.email.user,
        pass: config.email.pass
    },
});


const sendEmail = async (to,subject,body,html)=>{
try{
    const info= await trans.sendMail({
        from: "Fimel505011@gmail.com",
        to,
        subject,
        body,
        html,
    });
    return info;
}catch(error){
    console.log("error" + error);
};
};

const HTMLRecoveryEmail = (codigo) => {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Código de Recuperación de Cuenta</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
        }
        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #eeeeee;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #4285f4;
        }
        .content {
            padding: 30px 20px;
        }
        .code-container {
            margin: 30px 0;
            text-align: center;
        }
        .recovery-code {
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #333333;
            padding: 15px 20px;
            background-color: #f0f0f0;
            border-radius: 6px;
            display: inline-block;
        }
        .instructions {
            margin-bottom: 30px;
        }
        .footer {
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #999999;
            border-top: 1px solid #eeeeee;
        }
        .support {
            margin-top: 20px;
        }
        .button {
            display: inline-block;
            background-color: #4285f4;
            color: white;
            text-decoration: none;
            padding: 12px 30px;
            border-radius: 4px;
            font-weight: bold;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Fimels</div>
        </div>
        <div class="content">
            <h2>Código de Recuperación de Cuenta</h2>
            <div class="instructions">
                <p>Hola,</p>
                <p>Hemos recibido una solicitud para recuperar el acceso a tu cuenta. Por favor, utiliza el siguiente código para completar el proceso de recuperación:</p>
            </div>
            <div class="code-container">
                <div class="recovery-code">${codigo}</div>
            </div>
            <p>Este código expirará en 30 minutos por razones de seguridad.</p>
            <p>Si no solicitaste este código, por favor ignora este correo o contacta a nuestro equipo de soporte si tienes preocupaciones sobre la seguridad de tu cuenta.</p>
            <div class="support">
                <p>¿Necesitas ayuda? <a href="#">Contacta a nuestro equipo de soporte</a></p>
                <a href="#" class="button">Regresar al Sitio Web</a>
            </div>
        </div>
        <div class="footer">
            <p>Este es un mensaje automático, por favor no respondas a este correo.</p>
            <p>&copy; 2025 TuEmpresa. Todos los derechos reservados.</p>
            <p><a href="#">Política de Privacidad</a> | <a href="#">Términos de Servicio</a></p>
        </div>
    </div>
</body>
</html>
    `;
};

export {sendEmail,HTMLRecoveryEmail};