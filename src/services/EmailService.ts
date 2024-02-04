import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class EmailService {
    constructor(public to?:string, public subject?:string, public message?:string) {

    }
    
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
   

    async sendEmail() {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: this.to,
            subject: this.subject,
            html: this.message
        };

        const emails = await this.createTransporter().sendMail(mailOptions);

        console.log("Message sent: ", emails.messageId);
    }
}

export default EmailService;