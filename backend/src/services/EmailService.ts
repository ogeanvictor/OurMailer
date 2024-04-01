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
    to: string[],
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

        let mailOptions:Object = {
            from: emailBody.user,
            to: recipients,
            subject: emailBody.subject,
            html: emailBody.message
        };

        if (emailBody.message.includes("<img")) {
            const match = emailBody.message.match(/<img.*?src="(.*?)"/);

            if (match?.[1]) {
                let data = match?.[1].replace(/^data:image\/\w+;base64,/, "");
                let image = {
                    buffer: await this.convertToBuffer(data)
                }

                await this.uploadImage(image.buffer);
            };

            mailOptions = {
                ...mailOptions,
                attachments: [{
                    filename: 'image.png',
                    path: `${tempPath}image.png`
                }]
            };
        };

        const emails = await this.createTransporter(emailBody.host, emailBody.port, emailBody.secure, emailBody.user, emailBody.pass).sendMail(mailOptions);

        await this.deleteFile();
        return `Message sent to: ${emails.envelope.to}`;
    }

    async convertFile() {
        const csvArray: string[] = [];

        fs.createReadStream(`${tempPath}recipients.csv`)
        .pipe(parse({ delimiter: ",", from_line: 1}))
        .on("data", function(row) {
            csvArray.push(row);
        })
        .on("end", function() {
            console.log("finish");
        })
        .on("error", function(error) {
            console.log(error);
        });

        return csvArray;
    }

    async uploadFile(file: Express.Multer.File) {
        fs.writeFileSync(`${tempPath}recipients.csv`, file.buffer);
        return 'File saved!'
    }

    async deleteFile() {
        fs.readdir(tempPath, (error, files) => {
            if (error) throw error;
          
            for (const file of files) {
                fs.unlink(path.join(tempPath, file), (error) => {
                    if (error) throw error;
                });
            }
        });
    }

    async convertToBuffer(image: string) {
        const buffer = Buffer.from(image, 'base64');
        return buffer;
    }

    async uploadImage(image: Buffer) {
        fs.writeFileSync(`${tempPath}image.png`, image);
    }
}

export default EmailService;