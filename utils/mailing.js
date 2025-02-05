import transporter from "../config/nodemailer.js";

const email = process.env.GMAIL_EMAIL;

class Mailing {
    async send (emailData, res){

        console.log('EMAIL', email);
        // Configurar el objeto mailOptions
        const mailOptions = {
            from: '"Band Bros" <correo>',
            to: emailData.to,
            subject: emailData.subject,
            // text: "Contenido del email en texto plano",
            html: emailData.html
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("Error:", error);
                return res.status(400).json({message: 'No se ha podido enviar el email de confirmación'})
            } else {
                console.log("Email enviado:", info.response);
                return res.status(200).json({message: 'Mensaje enviado'})
            }
        });


    }
}

export default new Mailing;






