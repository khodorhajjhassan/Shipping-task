import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { deletShipment } from '../../Query';

export default function ButtonDelete({id,getShipments}) {
  const [click, setClick] = useState(false);

  const deleteShipment = async (e)=>{
    e.preventDefault();
    try{
      const response= await deletShipment(id);

      if(response.status === 200) {
        setClick(false);
        toast.success('Shipment Success Delete!');
        getShipments();
      
      }else {
        toast.error('Error in Delete!');

      }
    }catch(error){
      console.log(error)
    }
  }
  
  return (
    <div>
          <button
            onClick={() => setClick(!click)}
            className="p-2 bg-red-500 text-white rounded"
            disabled={click}
          >
           Delete
          </button>
         <div
        className={`fixed top-0 left-0 flex justify-center items-center w-full h-screen bg-gray-500 bg-opacity-50 bordered opacity-0 z-50 duration-300 ${
          click ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="w-80 h-60 shadow-xl bg-white m-auto rounded p-4 text-center z-50 ">
          <h2 className="font-bold text-2xl  text-red-500 mb-10">
            Delete Shipment
          </h2>
            <p className='text-lg my-5'>Are You Sure You Want Delete This Shipment !!</p>
          <div className="flex items-center gap-4 justify-center">
            <button
             className="border-2 rounded bg-secondary-500 text-white p-2 duration-300 hover:bg-red-500 "
             onClick={deleteShipment}
            >
              Delete
            </button>
            <button
              onClick={() => setClick(!click)}
              className="border-2 rounded bg-primary-500 text-white p-2  "
            >
              Cancel
            </button>
          </div>
        </div>
        <div
          onClick={() => setClick(!click)}
          className="p-3 font-bold rounded border-2 text-white bg-gray-700 hover:bg-gray-900 duration-300 cursor-pointer absolute top-5 right-5"
        >
          X
        </div>
      </div>
    </div>
  )
}
