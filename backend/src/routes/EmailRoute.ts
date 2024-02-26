import express from 'express';
import multer from 'multer';

import EmailController from '../controllers/EmailController';
import EmailService from '../services/EmailService';

const router = express.Router();
const upload = multer();
const emailController = new EmailController(new EmailService());

router.post('/uploadFile', upload.fields([{ name: "document"}]), emailController.uploadFile);
router.post('/sendEmail', emailController.sendEmail.bind(emailController));

export default router;