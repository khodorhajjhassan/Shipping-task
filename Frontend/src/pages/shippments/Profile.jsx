import React from 'react'
import Shippments from './Shippments';

export default function Profile() {




  return (
    <div>
      <div className='w-full h-80 bg-primary-500 flex flex-col justify-center items-center'>
        <h2 className='md:text-6xl text-3xl text-white font-bold'>PIXEL38 <span className='text-secondary-500'>Shipping</span></h2>
        <p className='text-secondary-500 md:text-2xl text-lg  my-4'>Find or Add a shippments for better experience</p>
        <a href="/addShipment" className='md:p-4 p-2 border rounded md:text-2xl text-lg text-white font-bold duration-300 hover:bg-secondary-500 ' >Add Shipment</a>
      </div>
      
      <div>
      <Shippments />
      </div>

    </div>
  )
}
