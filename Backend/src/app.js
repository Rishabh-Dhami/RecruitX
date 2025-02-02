import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser'
dotenv.config();


const app = express();

app.use(express.urlencoded({extended : true}));
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("hello")
});



export {app}