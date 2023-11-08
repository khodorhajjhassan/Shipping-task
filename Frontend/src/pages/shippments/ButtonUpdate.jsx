import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { editShipment } from '../../Query';

export default function ButtonUpdate({shipment,getShipments}) {
  const [click, setClick] = useState(false);
  const [nameError, setNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [submit, setSubmit] = useState(false);

  const id = shipment.shipment_id;


  const updateShipment =async(e) =>{
    e.preventDefault()

    const { customer_name, customer_address, customer_phone, status } = e.target.elements;
		const body = {
			customer_name: customer_name.value,
			customer_address: customer_address.value,
			customer_phone: customer_phone.value,
            status:status.value,
		};

    try {
      setSubmit(true);
     const response = await editShipment(id,body);
     if(response.status===200){
       toast.success("Shippment Update Successfuly !!");
        setSubmit(false);
        setClick(false);
        getShipments();
        
     }
     console.log(response.status)
    } catch (error) {
      setSubmit(false);
      if (error.response.status === 422) {
				console.log(error.response.data.errors);
				if (error.response.data.errors.customer_name) {
					setNameError(error.response.data.errors.customer_name[0]);
				} else {
					setNameError('');
				}
				if (error.response.data.errors.customer_address) {
					setAddressError(error.response.data.errors.customer_address[0]);
				} else {
					setAddressError('');
				}
				if (error.response.data.errors.customer_phone) {
					setPhoneError(error.response.data.errors.customer_phone[0]);
				} 
			}
    } 
  }

  return (
    <div>
          <button
            onClick={() => setClick(!click)}
            className="p-2 bg-secondary-500 text-white rounded"
            disabled={click}
          >
           Update
          </button>
         <div
        className={`fixed top-0 left-0 flex justify-center items-center w-full h-screen bg-gray-500 bg-opacity-50 bordered opacity-0 z-50 duration-300 ${
          click ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="md:w-[550px] w-96 h-auto shadow-xl bg-white m-auto rounded p-4 text-center z-50 ">
          <h2 className="font-bold text-2xl  text-primary-500 mb-10">
            Update Shipment
          </h2>
            <p className='text-lg my-5'>Update this shipment by Enter new data</p>
        <div className="bg-white  p-8 rounded shadow-md w-full">
            <form onSubmit={updateShipment}>
            <div className="mb-4">
                    <label className="block font-semibold text-gray-700 mb-2" for="name">
                        Customer Name
                    </label>
                    {nameError && (
									<p className="text-sm text-red-600">{nameError}</p>
								)}
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="customer_name" type="text" name='customer_name' placeholder="Enter Customer Name" defaultValue={shipment.customer_name} />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold text-gray-700 mb-2" for="email">
                    Customer Address
                    </label>
                    {addressError && (
									<p className="text-sm text-red-600">{addressError}</p>
								)}
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="customer_address" type="text" name='customer_address' placeholder="Enter Customer Address" defaultValue={shipment.customer_address}/>
                </div>
                <div className="mb-4">
                    <label className="block font-semibold text-gray-700 mb-2" for="password">
                        Customen Phone Number
                    </label>
                    {phoneError && (
									<p className="text-sm text-red-600">{phoneError}</p>
								)}
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="customer_phone" type="number" name='customer_phone' placeholder="Enter Customer Phone Number" defaultValue={shipment.customer_phone} />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold text-gray-700 mb-2" for="password">
                        Shippment Status
                    </label>
                        <select name="status" id="status" 
                        className='className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"'>
                            <option disabled >Select Status</option>
                            <option value="pending">pending</option>
                            <option value="in_progress">in_progress</option>
                            <option value="shipped">shipped</option>
                            <option value="delivered">delivered</option>
                        </select>
                </div>
                
                        <div className="flex justify-center item-center w-full">
                    
                <div className="mb-6 w-/6/12 flex gap-2">
                    <button
                        className="bg-secondary-500 w-full hover:bg-opacity-90 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        {submit ? "Submit..." :"Submit"}
                    </button>
                    <p
                        className="bg-red-500 w-full hover:bg-opacity-90 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={()=>setClick(!click)}>
                        Cancel
                    </p>
                </div>
                        </div>
            </form>
            </div>

         
        </div>
        <div
          onClick={() => setClick(!click)}
          className="p-3 font-bold rounded border-2 text-white bg-gray-700 hover:bg-gray-900 duration-300 cursor-pointer absolute top-5 right-5 z-50"
        >
          X
        </div>
      </div>
    </div>
  )
}
