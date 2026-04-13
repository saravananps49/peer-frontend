import React, { useEffect, useState } from 'react'
// import "./Navbar.css"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import auth from '../../config/firebase'
import { signOut } from 'firebase/auth'


function Navbar() 
{

    const navigate = useNavigate()
    const [log, setLog] = useState(false)

    useEffect(()=>
    {
      auth.onAuthStateChanged(function(user)
      { 
         if(user)
         {
           console.log("User Logged In")
           setLog(true)
         }
         else
         {
          console.log("User Logged Out")
          setLog(false)
         }
      }
      ) 
    },[]
    )

    function logout()
    {
      signOut(auth)
    }


  return (
    <div className='py-5 flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Peer Project Hub</h2>
        <div className='flex items-center'>
            {/* <Link className='list-none px-5' to={"/home"}>Home</Link> */}
            <Link className='list-none px-5' to={"/blogs"}>Coding Projects</Link>
            {/* <Link className='list-none px-5' to={"/home"}>About</Link> */}


            {
               log? <button className='button-style hidden md:block' onClick={logout}>Logout</button> : <button className='button-style hidden md:block' onClick={()=>navigate("/login")}>Login</button>
            }

            {/* <button className='button-style hidden md:block' onClick={()=>navigate("/login")}>Login</button> */}
            {/* <button className='button-style hidden md:block'>Logout</button> */}
        </div>
    </div>
  )
}

export default Navbar