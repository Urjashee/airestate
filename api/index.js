import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import {userRouter} from "./routes/user.route.js";
import {authRouter} from "./routes/auth.route.js";
import {estateRouter} from "./routes/property.route.js";
import path from 'path'; //only for deployment
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB!')
}).catch((err) => {
    console.error(err)
})

const __dirname = path.resolve(); //only for deployment

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}));

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/property', estateRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

//only for deployment start
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

//only for deployment end

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});