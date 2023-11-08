import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import logo from '../assets/pixel-logo.png';
export default function GuestLayout() {

    const {token}=useStateContext()
    if(token){
        return <Navigate to="/profile"/>
    }
  return (
    <div>
      <div className='absolute top-1 left-1 md:w-40 w-24 '>
        <a href="/login">
          <img src={logo} alt="" />
          </a>
          </div>
          <div className='flex flex-row flex-end justify-end bg-primary-500 p-4 text-white w-full'>
            <a className='bg-secondary-500 p-2 rounded' href="/trackShipment">Track Your Shipment</a>

          </div>
          <div className="h-screen bg-primary-500 flex  justify-center items-center ">
        <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">

        <Outlet />
        
    </div>
    </div>
        <div className='w-full bg-secondary-500 h-16 text-center flex justify-center items-center'>
          <p className='text-white'> Design and built by <span className='text-primary-500 font-bold'>Khodor Hajj Hassan</span> </p>
        </div>
    </div>
  )
}
