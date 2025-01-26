import nodemailer from 'nodemailer';

// Crear un objeto de transporte
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "aldaydev@gmail.com",
        pass: "ryja wkun smln tnf",
    },
});

class Mailing {
    async send (email){
        // Configurar el objeto mailOptions
        const mailOptions = {
            from: "aldaydev@gmail.com",
            to: "rafaldayparejo@gmail.com",
            subject: "Asunto del email",
            text: "Contenido del email en texto plano",
            html: "<h1>Contenido del email en HTML</h1>",
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

export default new Mailing;






