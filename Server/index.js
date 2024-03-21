import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import {UserRouter} from './routes/user.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials:true
}));
app.use(cookieParser());
app.use('/auth',UserRouter);

// mongodb+srv://Admin:Admin-MongoDB@cluster-roj-pagar.sbjnqgy.mongodb.net/Roj-Pagar-DB

mongoose.connect('mongodb+srv://Admin:Admin-MongoDB@cluster-roj-pagar.sbjnqgy.mongodb.net')

app.listen(process.env.PORT,()=>{
    console.log(`listening on ${process.env.PORT}`);
});


