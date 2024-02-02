import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 3001;
const app = express();

// Import routes
import emailRoutes from './routes/emailRoute';

app.use(cors());

app.use('/api', emailRoutes);

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});