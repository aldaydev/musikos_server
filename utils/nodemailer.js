import nodemailer from 'nodemailer';

// Crear un objeto de transporte
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "su_correo@gmail.com",
        pass: "su_contraseña",
    },
});

class Mail {
    async confirmAccount (){
        // Configurar el objeto mailOptions
        const mailOptions = {
            from: "remitente@ejemplo.com",
            to: "destinatario@ejemplo.com",
            subject: "Asunto del email",
            text: "Contenido del email en texto plano",
            html: "<p>Contenido del email en HTML</p>",
        };

        // Enviar el email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("Error:", error);
            } else {
                console.log("Email enviado:", info.response);
            }
        });

    }
}






