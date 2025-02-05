import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { userRouter } from './routes/user.routes.js';
dotenv.config();


const app = express();

app.use(express.urlencoded({extended : true}));
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("hello")
});

app.use("/api/v1/user", userRouter);

export {app}