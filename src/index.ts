import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/', (req,res) => {
    res.send("Hello World!")
});

app.use(cors());

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});