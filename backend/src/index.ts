import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 3001;
const app = express();

// Import routes
import emailRoutes from './routes/EmailRoute';

app.use(cors());
app.use(bodyParser.json());

app.use('/api', emailRoutes);

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});