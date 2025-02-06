import logger from "../config/logger.config.js";
import transporter from "../config/nodemailer.js";

class Mailing {
    async send (emailData, res){

        // Configurar el objeto mailOptions
        const mailOptions = {
            from: '"Band Bros" <correo>',
            to: emailData.to,
            subject: emailData.subject,
            html: emailData.html
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                logger.error("Error:", error);
                return res.status(500).json({message: 'No se ha podido enviar el email de confirmación. Intétalo en unos minutos', error: error})
            }
        });


    }
}

export default new Mailing;






