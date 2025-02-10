import logger from "../config/logger.config.js";
import transporter from "../config/nodemailer.js";

class Email {

    constructor({fromName = 'Musiko', fromEmail = 'correo', to, subject, html}){
        this.fromName = fromName;
        this.fromEmail = fromEmail;
        this.to = to;
        this.subject = subject;
        this.html = html;
    }

    send (){

        // Configurar el objeto mailOptions
        const mailOptions = {
            from: `"${this.fromName}" <${this.fromEmail}>`,
            to: this.to,
            subject: this.subject,
            html: this.html
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                logger.error("Error:", error);
                throw {code: 'emailFailed'};
            }
        });
    }
}

export default Email;






