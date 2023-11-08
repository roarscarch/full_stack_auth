import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';


export const signup= async (req,res,next)=>{
    // console.log(req.body);
    const {username , email , password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username , email , password:hashedPassword});
    try{

        await newUser.save();
        
        res.status(200).json({message: "Signup success"});

    } catch(error){
        next(error);// custom errorHandler
    }
};

export const signin= async (req,res,next)=>{
    // console.log(req.body);
   
    try{
        const {email , password} = req.body;
        const validUser= await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,"Invalid Email"));
        }
        // if email exists then we are gonna check the password
        const validPassword= await bcryptjs.compare(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(400,"Invalid Password"));
        }
        const token = jwt.sign({id: validUser._id},process.env.JWT_Secret); 
        const {password:hashedPassword,...rest}=validUser._doc;// password is not sent to the client
        const expiresIn = new Date(Date.now() + 8*60*60*1000);
        res.cookie("access_token",token,{httpOnly:true,expires:expiresIn}).status(200).json(rest);// first name then actual token
        // httpOnly:true means that the cookie can only be accessed by the server and cannot be accessed by the client or third party applications
    }
    catch(error){
        next(error);
    }
};
// why did we send validUser._doc instead of validUser?
// because validUser is an object and validUser._doc is an object with all the properties of validUser except password
// valid user mei bhot cheez hoti hai but in validUser._doc there IS LIMITED INFO which we need.


export const google= async (req,res,next)=>{
    try{
        const user= await User.findOne({email:req.body.email});
        if(user){
            const token= jwt.sign({id:user._id},process.env.JWT_Secret);
            const {password:hashedPassword,...rest}=user._doc;
            const expiryDate = new Date(Date.now() + 8*60*60*1000);
            res.cookie("access_token",token,{httpOnly:true,expires:expiryDate}).status(200).json(rest);
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8)+
            Math.random().toString(36).slice(-8);

            const hashedPassword = bcryptjs.hashSync(generatedPassword,10);

            const newUser = new User({

            username:req.body.name.split(" ").join("").toLowerCase()+
            Math.random().toString(36).slice(-8),

            email:req.body.email,password:hashedPassword,

            profilePicture:req.body.photo
            });
            await newUser.save();
            const token= jwt.sign({id:newUser._id},process.env.JWT_Secret);
        }
    } catch(error){
        next(error);
    }
}