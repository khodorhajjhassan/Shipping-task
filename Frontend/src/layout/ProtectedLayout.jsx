import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import logo from '../assets/pixel-logo.png';
import door from '../assets/door.svg';
import { getUser, logout } from '../Query';

export default function ProtectedLayout() {

    const {user,token,setUser, setToken} = useStateContext()


    if(!token){
        return <Navigate to="/login"/>
    }

    useEffect(()=>{
      try {
        const user = async () =>{
          const res = await getUser();
          setUser(res.data);
        }
        user();

      }catch(error){
        console.log(error)
      }
    },[])
    const userLogout = async (e) =>{
        e.preventDefault()
        try {
          logout().then(() => {
            setUser({})
            setToken(null)
          })
        }catch(error){
          console.log(error)
        }
       
    }
  return (
    <div>
        <nav className=' '>
            <div className="flex justify-between items-center mb-5">
                <div className='bg-primary-500 w-32'>
                 <a href="/profile"><img src={logo} alt="" className='w-full h-full' /></a>
                </div>
                <div className='flex items-center text-xl gap-5 font-bold mr-5'>
                    <h2 className=' '>Welcome {user.name}</h2>
                    <a href="#" className='text-2 flex gap-2 hover:text-primary-500 duration-300' onClick={userLogout} ><img src={door} className='w-6' alt="" /> Logout</a>
                    
                </div>
            </div>
        </nav>
        <Outlet />
        <div className='w-full bg-primary-500 h-16 text-center flex justify-center items-center'>
          <p className='text-white'> Design and built by <span className='text-secondary-500 font-bold'>Khodor Hajj Hassan</span> </p>
        </div>
    </div>
  )
}
