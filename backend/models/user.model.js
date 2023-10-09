import mongoose from "mongoose";
const userSchema=  new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps: true});// each user has extra information that is 
// time of creation and time of deletion . This is not necessary but admin can use it to sort users by time
// mongoDB automatically adds this information for us

const User = mongoose.model('User',userSchema);
// model create karne ke liye pehle to tumko schema banana padega
// fir model bnana pdega using mongoose.model('User',userSchema)
// first parameter model ka naam jo ki hamesha capital me hoga and 2nd schema ka naam.
// and model ka naam singular hoga kyunki mongodb automically plural ek s add kar dega.

export default User;