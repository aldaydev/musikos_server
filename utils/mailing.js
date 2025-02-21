
import transporter from "../config/mailer.config.js";
import { LogError } from "./errors/logErrors.js";

class Email {

    constructor({fromName, fromEmail, to, subject, html}){
        this.fromName = fromName || 'Musikos';
        this.fromEmail = fromEmail || process.env.MAILER_EMAIL;
        this.to = to;
        this.subject = subject;
        this.html = html;
    }

    //Method to send a instance of Email class
    send (){

        const mailOptions = {
            from: `"${this.fromName}" <${this.fromEmail}>`,
            to: this.to,
            subject: this.subject,
            html: this.html
        };

        return new Promise((resolve, reject)=> {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    new LogError({
                        message: 'Error sending email',
                        error: error.message
                    }).add('errorSendingEmail');
                    reject({code: 'internalServerError', key: 'errorSendingEmail'});
                }else{
                    resolve(info)
                }
            });
        })
    }
}

export default Email;






