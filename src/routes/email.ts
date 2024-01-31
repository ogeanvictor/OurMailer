import express from 'express';

const emailRoutes = express.Router();

emailRoutes.post('/', (req, res) => {
    res.send('Cria novo email');
});

emailRoutes.get('/', (req, res) => {
    res.send('Lista todos os emails');
});

export default emailRoutes;