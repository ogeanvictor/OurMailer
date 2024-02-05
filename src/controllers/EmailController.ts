import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import EmailService from '../services/EmailService';

class EmailController {
    private emailService:EmailService;

    constructor(emailService:EmailService) {
        this.emailService = emailService;
    }

    async sendEmail(req:Request, res:Response):Promise<void> {
        try {
            const email = await this.emailService.sendEmail(req.body);
            res.status(StatusCodes.OK).send(email);
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).send(error);
        }
    }
}

export default EmailController;