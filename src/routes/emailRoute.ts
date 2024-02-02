import express from 'express';

import EmailController from '../controllers/EmailController';

const router = express.Router();

router.post('sendEmail', EmailController.sendEmail);

export default router;