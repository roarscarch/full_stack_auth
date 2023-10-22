import express  from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from 'dotenv';

import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
dotenv.config();// initialising dotenv configuration



mongoose
.connect(process.env.DB_URL)
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch((err)=>{
    console.log(err);
});




// app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        message,
        success:false,
        statusCode:statusCode
    })
})







app.listen(3000,()=>{
    console.log("app listening on port 3000");
});