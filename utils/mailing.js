import logger from "../config/logger.config.js";
import transporter from "../config/nodemailer.js";
import { LogError } from "./errors/logErrors.js";

class Email {

    constructor({fromName = 'Musiko', fromEmail = 'correo', to, subject, html}){
        this.fromName = fromName;
        this.fromEmail = fromEmail;
        this.to = to;
        this.subject = subject;
        this.html = html;
    }

    async send (){
        try{
            // Configurar el objeto mailOptions
            const mailOptions = {
                from: `"${this.fromName}" <${this.fromEmail}>`,
                to: this.to,
                subject: this.subject,
                html: this.html
            };

            return transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    new LogError({message: 'Email failed', error: error.message}).add('errorSendingEmail')
                    console.log(error);
                    throw {code: 'internalServerError', key: 'errorSendingEmail'};
                }else{
                    console.log(data);
                }
            });
        }catch(error){
            throw(error);
        }
        
    }
}

export default Email;






