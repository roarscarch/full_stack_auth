import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

export default function SignUp() {
  const navigate = useNavigate();
 const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  // console.log(formData);
  const [loading, setLoading]= useState(false);
  const [error, setError]= useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();


    try{
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success===false){
        setError(true);
        setLoading(false);
      }
      else{
        setLoading(false);
        setError(false);
        navigate('/sign-in');
      }
     console.log(data);
    }
    catch(error){
      setError(true);
      setLoading(false);
      next(error);
    }


    
    //console.log(data);
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
   <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
   <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

    <input type="text" placeholder="Username" id="username" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
    <input type="email" placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/ >
    <input type="password" placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/ >



    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled-80' disabled={loading}>{loading ? 'Loading...':'Sign up'}</button>
   </form>
   <div className='flex gap-2 mt-5'>
   <p>Have an account?</p>
   <Link to="/sign-in"><span className='text-blue-500'>Sign In</span></Link>
   </div>
   <p className='text-red-600 mt-5'>{error && 'Something went wrong !'}</p>
    </div>
  )
}
