import express  from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();// initialising dotenv configuration



mongoose
.connect(process.env.DB_URL)
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch((err)=>{
    console.log(err);
});















app.listen(3000,()=>{
    console.log("app listening on port 3000");
});