import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

import {app} from '../firebase';
import { signInSuccess } from "../redux/user/userSlice";

export default function OAuth() {
    const handleGoogleClick = async ()=>{
        try{
            const provider= new GoogleAuthProvider();
            const auth= getAuth(app);
            const result= await signInWithPopup(auth, provider);
           // console.log(result);

           const res= await fetch('/api/auth/google',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringyfy({
                name:result.user.displayName,
                email:result.user.email,
                photo:result.user.photoURL
            })
           });
           const data= await res.json();
           dispatchEvent(signInSuccess(data));
        }
        catch(error){
            console.log("could not sign in with google",error);
        }
    }
  return (
    <button type=' button ' onClick= {handleGoogleClick}className='bg-red-700 text-white rounded-lg p-3
    uppercase hover:opacity-95'>Continue with google</button>
  )
}
// default type is submit so we have to change it to button
// to prevent submission of form