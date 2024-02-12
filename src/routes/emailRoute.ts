import express from 'express';

import EmailController from '../controllers/EmailController';
import EmailService from '../services/EmailService'

const router = express.Router();
const emailController = new EmailController(new EmailService());

router.post('/sendEmail', emailController.sendEmail);

export default router;