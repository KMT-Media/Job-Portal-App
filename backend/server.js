import express from 'express';

import connectDB from './config/db.js';
import colors from 'colors';
import dotenv from 'dotenv';

// middleware
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
// Routes
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();
const app = express();

// accept json data in the body
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running....');
});

app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
