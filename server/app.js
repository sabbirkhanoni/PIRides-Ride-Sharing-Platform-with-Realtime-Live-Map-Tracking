import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './database/database.js'

import userRouter from './routes/user.routes.js';
import riderRouter from './routes/rider.routes.js';

import cookieParser from 'cookie-parser';


config();
connectDB();
const app = express();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', userRouter);
app.use('/riders', riderRouter);

export default app;