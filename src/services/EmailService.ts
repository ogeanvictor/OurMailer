import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface emailBody {
    host: string,
    port: number,
    user: string,
    pass: string,
    to: string,
    subject: string,
    message: string
}

class EmailService {
    createTransporter(host: string, port: number, user: string, pass: string) {
        const transport = nodemailer.createTransport({
            host: host,
            port: port,
            secure: true,
            auth: {
                user: user,
                pass: pass
            }
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

        const emails = await this.createTransporter(emailBody.host, emailBody.port, emailBody.user, emailBody.pass).sendMail(mailOptions);

        console.log("Message sent: ", emails);
    }
}

export default EmailService;