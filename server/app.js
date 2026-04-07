import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './database/database.js'

import userRouter from './routes/user.routes.js';
import riderRouter from './routes/rider.routes.js';

import cookieParser from 'cookie-parser';
import journeyRouter from './routes/journey.route.js';


config();
connectDB();
const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    process.env.PORT_HOST || 'https://zxzdhm93-5173.asse.devtunnels.ms'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', userRouter);
app.use('/riders', riderRouter);
app.use('/journeys', journeyRouter);

export default app;