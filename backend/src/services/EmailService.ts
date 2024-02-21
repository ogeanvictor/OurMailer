import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';

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
        const recipients = await this.convertFile(emailBody.to);

        const mailOptions = {
            from: emailBody.user,
            to: recipients,
            subject: emailBody.subject,
            html: emailBody.message
        };

        const emails = await this.createTransporter(emailBody.host, emailBody.port, emailBody.secure, emailBody.user, emailBody.pass).sendMail(mailOptions);

        console.log("Message sent: ", emails);
    }

    async convertFile(file:any) {
        const tempPath = path.join(__dirname, "../tmp/");
        const buffer = Buffer.from(file);
        const csvArray: any[] = [];
    
        fs.writeFileSync(`${tempPath}teste`, buffer);

        fs.createReadStream(`${tempPath}teste`)
        .pipe(parse({ delimiter: ",", from_line: 2}))
        .on("data", function(row) {
            console.log(row);
            csvArray.push(row)
        })
        .on("end", function() {
            console.log("finish");
        })
        .on("error", function(error) {
            console.log(error);
        })

        fs.unlinkSync(`${tempPath}teste`);
        return csvArray;
    }
}

export default EmailService;