import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './database/database.js'

import userRouter from './routes/user.routes.js';
import riderRouter from './routes/rider.routes.js';

import cookieParser from 'cookie-parser';
import mapsRouter from './routes/map.routes.js';
import journeyRouter from './routes/journey.route.js';


config();
connectDB();
const app = express();



app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // fallback to localhost if env not set
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/maps', mapsRouter);
app.use('/users', userRouter);
app.use('/riders', riderRouter);
app.use('/journeys', journeyRouter);

export default app;