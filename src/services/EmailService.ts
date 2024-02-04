import nodemailer, { Transport } from 'nodemailer';

class EmailService {
    constructor(public to?:string, public subject?:string, public message?:string) {

    }
    
    createTransporter() {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "",
                pass: ""
            }
        });

        return transport;
    }
   

    async sendEmail() {
        const mailOptions = {
            from: "",
            to: this.to,
            subject: this.subject,
            html: this.message
        };

        const emails = await this.createTransporter().sendMail(mailOptions);

        console.log("Message sent: ", emails.messageId);
    }
}

export default EmailService;