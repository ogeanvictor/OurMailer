import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface emailBody {
    to: string,
    subject: string,
    message: string
}

class EmailService {
    createTransporter() {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.PASS_USER
            }
        });

        return transport;
    }
   

    async sendEmail(emailBody:emailBody) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: emailBody.to,
            subject: emailBody.subject,
            html: emailBody.message
        };

        const emails = await this.createTransporter().sendMail(mailOptions);

        console.log("Message sent: ", emails.messageId);
    }
}

export default EmailService;