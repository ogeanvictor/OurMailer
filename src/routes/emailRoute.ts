import express from 'express';

import EmailController from '../controllers/EmailController';
import EmailService from '../services/EmailService'

const router = express.Router();
const emailController = new EmailController(new EmailService());

router.post('/sendEmail', emailController.sendEmail.bind(emailController));
router.post('/createTransporter', emailController.createTransport.bind(emailController));

export default router;