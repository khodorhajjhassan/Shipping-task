import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { addShipment } from '../../Query';


export default function AddShipment() {

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
	const [addressError, setAddressError] = useState('');
	const [phoneError, setPhoneError] = useState('');
	const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();


  const onSubmit =async(e) =>{
    e.preventDefault()

    const { customer_name,email, customer_address, customer_phone } = e.target.elements;
		const body = {
			customer_name: customer_name.value,
			email: email.value,
			customer_address: customer_address.value,
			customer_phone: customer_phone.value,
		};

    try {
      
      setSubmit(true);
     const response = await addShipment(body);
     if(response.status===200){
       toast.success("Shippment Add Successfuly !!");
        setSubmit(false);
        navigate('/profile');
      
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
        if (error.response.data.errors.email) {
					setEmailError(error.response.data.errors.email[0]);
				} 
			}
    } 
    
  }


  return (
    <div>
        <div class="h-screen bg-gray-300 flex  justify-center items-center ">
        <div class="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
     
            <h1 class="text-3xl font-bold mb-8 text-center text-secondary-500" >Add Shipment</h1>
            <form onSubmit={onSubmit}>
            <div class="mb-4">
                    <label class="block font-semibold text-gray-700 mb-2" for="name">
                        Customer Name
                    </label>
                    {nameError && (
									<p className="text-sm text-red-600">{nameError}</p>
								)}
                    <input
                        class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="customer_name" type="text" name='customer_name' placeholder="Enter Customer Name" />
                </div>
                <div class="mb-4">
                    <label class="block font-semibold text-gray-700 mb-2" for="name">
                        Customer Email
                    </label>
                    {emailError && (
									<p className="text-sm text-red-600">{emailError}</p>
								)}
                    <input
                        class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="email" name='email' placeholder="Enter Customer Email" />
                </div>
                <div class="mb-4">
                    <label class="block font-semibold text-gray-700 mb-2" for="email">
                    Customer Address
                    </label>
                    {addressError && (
									<p className="text-sm text-red-600">{addressError}</p>
								)}
                    <input
                        class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="customer_address" type="text" name='customer_address' placeholder="Enter Customer Address" />
                </div>
                <div class="mb-4">
                    <label class="block font-semibold text-gray-700 mb-2" for="password">
                        Customen Phone Number
                    </label>
                    {phoneError && (
									<p className="text-sm text-red-600">{phoneError}</p>
								)}
                    <input
                        class="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="customer_phone" type="number" name='customer_phone' placeholder="Enter Customer Phone Number" />
                </div>
                
                        <div className="flex justify-center item-center w-full">
                    
                <div class="mb-6 w-/6/12">
                    <button
                        class="bg-secondary-500 w-full hover:bg-opacity-90 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        {submit ? "Submit..." :"Submit"}
                    </button>
                </div>
                        </div>
            </form>
        </div>
        </div>
        </div>
  
  )
}
