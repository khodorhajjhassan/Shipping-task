import React, { useState } from 'react'
import { useStateContext } from '../context/ContextProvider';
import { register } from '../Query';

export default function Register() {

  const {setUser, setToken} = useStateContext()
  const [nameError, setNameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');


  const onSubmit =async(e) =>{
    e.preventDefault()

    const { name, email, password, password_confirmation } = e.target.elements;
		const body = {
			name: name.value,
			email: email.value,
			password: password.value,
			password_confirmation: password_confirmation.value,
		};

    try {
     const response = await register(body);
     const data= response.data;
        setUser(data.user)
        setToken(data.token)
      
    } catch (error) {
      if (error.response.status === 422) {
				console.log(error.response.data.errors);
				if (error.response.data.errors.name) {
					setNameError(error.response.data.errors.name[0]);
				} else {
					setNameError('');
				}
				if (error.response.data.errors.email) {
					setEmailError(error.response.data.errors.email[0]);
				} else {
					setEmailError('');
				}
				if (error.response.data.errors.password) {
					setPasswordError(error.response.data.errors.password[0]);
				} else {
					setPasswordError('');
				}
			}
    } 
    
  }


  return (
    <div>
     
            <h1 className="text-3xl font-bold mb-8 text-center text-secondary-500" >Sign Up</h1>
            <form onSubmit={onSubmit}>
            <div className="mb-4">
                    <label className="block font-semibold text-gray-700 mb-2" for="name">
                        Name
                    </label>
                    {nameError && (
									<p className="text-sm text-red-600">{nameError}</p>
								)}
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name" type="text" name='name' placeholder="Enter your Name" />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold text-gray-700 mb-2" for="email">
                        Email Address
                    </label>
                    {emailError && (
									<p className="text-sm text-red-600">{emailError}</p>
								)}
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="email" name='email' placeholder="Enter your email address" />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold text-gray-700 mb-2" for="password">
                        Password
                    </label>
                    {passwordError && (
									<p className="text-sm text-red-600">{passwordError}</p>
								)}
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" name='password' placeholder="Enter your password" />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold text-gray-700 mb-2" for="password_confirmation">
                        Confirm Password
                    </label>
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password_confirmation" type="password" name='password_confirmation' placeholder="Confirm your password" />
                </div>
                        <div className="flex md:flex-row flex-col justify-between item-center gap-4">
                          <p>A member?<a className="text-primary-500 hover:text-secondary-500 duration-300" href="/login"> Login</a></p>
                    
                <div className="mb-6">
                    <button
                        className="bg-secondary-500 hover:bg-opacity-90 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Sign Up
                    </button>
                </div>
                        </div>
            </form>
        </div>
  
  )
}
