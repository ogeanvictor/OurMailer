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
    to: any,
    subject: string,
    message: string
}

const tempPath = path.join(__dirname, "../tmp/");

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
        const recipients:string[] = await this.convertFile();
        console.log(recipients)

        const mailOptions = {
            from: emailBody.user,
            to: recipients,
            subject: emailBody.subject,
            html: emailBody.message
        };

        const emails = await this.createTransporter(emailBody.host, emailBody.port, emailBody.secure, emailBody.user, emailBody.pass).sendMail(mailOptions);

        console.log("Message sent: ", emails);
        await this.deleteFile();
    }

    async convertFile() {
        const csvArray: string[] = [];

        fs.createReadStream(`${tempPath}recipients.csv`)
        .pipe(parse({ delimiter: ",", from_line: 1}))
        .on("data", function(row) {
            csvArray.push(row)
        })
        .on("end", function() {
            console.log("finish");
        })
        .on("error", function(error) {
            console.log(error);
        })

        return csvArray;
    }

    async uploadFile(file: Express.Multer.File) {
        fs.writeFileSync(`${tempPath}recipients.csv`, file.buffer);
        return 'File saved!'
    }

    async deleteFile() {
        fs.unlinkSync(`${tempPath}recipients.csv`);
    }
}

export default EmailService;