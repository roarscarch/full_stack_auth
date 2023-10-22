import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className="bg-sky-200 flex items-center gap-7 mx-auto">
        <Link to= "/">
        <div className="font-bold">Auth App</div>
        </Link>
        <ul className="flex gap-4">
            <Link to="/profile"><li> Profile</li></Link>
            
            <Link to="/sign-in"><li> SignIn</li></Link>
            <Link to="/sign-up"><li> SignUp</li></Link>
            <Link to="/about"><li> About</li></Link>
        </ul>
        
    </div>
  )
}
