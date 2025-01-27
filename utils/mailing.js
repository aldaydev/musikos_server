import nodemailer from 'nodemailer';

const email = "aldaymailing@gmail.com";
const pass = "kttb aoub hwfz qsfw";

// Crear un objeto de transporte
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: email,
        pass: pass,
    },
});

class Mailing {
    async send (emailData){
        // Configurar el objeto mailOptions
        const mailOptions = {
            from: email,
            to: emailData.to,
            subject: emailData.subject,
            // text: "Contenido del email en texto plano",
            html: emailData.html
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






