import React, { useEffect, useState } from 'react'
import logo from '../../assets/pixel-logo.png'
import { TailSpin } from "react-loader-spinner";
import ButtonDelete from './buttonDelete';
import ButtonUpdate from './ButtonUpdate';
import { viewShipments } from '../../Query';



export default function Shippments() {

    const [shipment,setShipment]= useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchText, setSearchText] = useState('')
    

    const getShipments = async () =>{
      try{
      const res = await viewShipments();
      if (res.data.status === 'success') {
          setShipment(res.data.data); 
          setIsLoading(false);
        }
      }catch(error)
      {
        console.log(error);
      }
    }

    useEffect(()=>{
      try {
        getShipments();
        setIsLoading(true)
      }catch(error){
        console.log(error)
        setIsLoading(false);
      }
    },[])

    const filterShipment = shipment.filter((val) =>
    val.customer_name.toLowerCase().includes(searchText.toLowerCase()) ||
    val.waybill.toLowerCase().includes(searchText.toLowerCase()),
  )

  return (
    <div>
           
        {isLoading && (
            <div className=" flex w-full justify-center items-center h-40">
            <TailSpin color="#8000B4" size={40} />
            </div>
        )}
         {!isLoading && (
          <>
          <div className='w-4/5 m-auto my-4 flex gap-2 items-center'>
            <input
            type="text"
            placeholder="Search by user or Status..."
            className="px-4 py-2 border border-gray-400 rounded-lg w-full"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            />


          </div>

            {shipment.length === 0  ? (
                <div className="p-4 text-center text-3xl text-secondary-500 ">
                OOPS !! No Shippments Found.
              </div>
            ) : (
    <div className='w-4/5 m-auto grid md:grid-cols-2 grid-cols-1 gap-10 my-5 '>
        
        {filterShipment.map((val, index) => (
          
          <div className="w-full flex lg:flex-row md:flex-col flex-col gap-2 bg-gray-300 h-auto items-center rounded" key={index}>
                <img src={logo} className='w-48 ' alt="" />
            <div className='flex flex-col gap-2 p-5 '>
            <div className='flex flex-col gap-4 p-5 '>
                <div className='flex gap-2'>
                    <h2 className='text-md  tracking-wider flex gap-2 items-center font-bold text-secondary-500'><img src="/waybill.svg" className='w-6' alt="" /> Waybill: 
                    </h2>
                    <span className='text-primary-500 font-normal'> {val.waybill}</span> 
                </div>
                <div className='flex gap-2 flex-wrap'>
                    <h2 className='text-md  tracking-wider flex gap-2 items-center font-bold text-secondary-500'><img src="/user.svg" className='w-6' alt="" /> Name: 
                    </h2>
                    <span className='text-primary-500 font-normal'> {val.customer_name}</span> 
                </div>
                <div className='flex gap-2 flex-wrap flex-row'>
                    <h2 className='text-md  tracking-wider flex gap-2 items-center font-bold text-secondary-500'><img src="/address.svg" className='w-6' alt="" /> Address: 
                    </h2>
                    <span className='text-primary-500 font-normal'> {val.customer_address}</span> 
                </div> 
                <div className='flex flex-wrap gap-2'>
                    <h2 className='text-md  tracking-wider flex gap-2 items-center font-bold text-secondary-500'><img src="/mail.svg" className='w-6' alt="" /> email:
                    </h2>
                    <span className='text-primary-500 font-normal'> {val.email}</span> 
                </div> 
                <div className='flex gap-2 flex-wrap'>
                    <h2 className='text-md  tracking-wider flex gap-2 items-center font-bold text-secondary-500'><img src="/phone.svg" className='w-6' alt="" /> Phone: 
                    </h2>
                    <span className='text-primary-500 font-normal'> {val.customer_phone}</span> 
                </div>
                 <div className='flex gap-2 flex-wrap'>
                    <h2 className='text-md  tracking-wider flex gap-2 items-center font-bold text-secondary-500'><img src="/status.svg" className='w-6' alt="" /> Status: 
                    </h2>
                    <span className='text-primary-500 font-normal'> {val.status}</span> 
                </div>
               
            <div className='flex my-4 items-center gap-2 justify-end'>
                    <button className=''><ButtonUpdate getShipments={getShipments} shipment={val}/></button>
                    <div className=''> <ButtonDelete getShipments={getShipments} id={val.shipment_id}/></div> 
                    
                </div>

            </div>
            </div>
          </div>
        ))}
        </div>
         )}
        </>
        )}
      </div>
     
  )
}
