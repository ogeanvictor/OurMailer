import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface emailBody {
    host: string,
    port: number,
    secure: boolean,
    user: string,
    pass: string,
    to: File | Blob | string[],
    subject: string,
    message: string
}

class EmailService {
    createTransporter(host: string, port: number, secure: boolean, user: string, pass: string) {
        const transport = nodemailer.createTransport({
            host: host,
            port: port,
            secure: secure,
            auth: {
                user: user,
                pass: pass
            }
        });

        transport.verify(function (error, success) {
            if (error) return error;
            else return success;
        });

        return transport;
    }
   

    async sendEmail(emailBody:emailBody) {
        const mailOptions = {
            from: emailBody.user,
            to: emailBody.to,
            subject: emailBody.subject,
            html: emailBody.message
        };

        const emails = await this.createTransporter(emailBody.host, emailBody.port, emailBody.secure, emailBody.user, emailBody.pass).sendMail(mailOptions);

        console.log("Message sent: ", emails);
    }

    async convertFile(file:File) {
        
    }
}

export default EmailService;