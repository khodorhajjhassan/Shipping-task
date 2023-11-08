import React, { useState } from 'react'
import { useStateContext } from '../context/ContextProvider';
import { login } from '../Query';

export default function Login() {

  const {setUser, setToken} = useStateContext()
  const [error, setError] = useState(null);
  
  
  const onSubmit = async (e) => {
    e.preventDefault();
  
    const { email, password } = e.target.elements;
    const body = {
      email: email.value,
      password: password.value,
    };
  
    try {
      const response = await login(body);
      const data = response.data;
  
      setUser(data.user);
      setToken(data.token);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError("Unauthorized: Please login.");
        } else if (error.response.status === 422) {
          setError(error.response.data.message );
        } 
      } 
    }
  }

  return (
    <div>
            <h1 className="text-3xl font-bold mb-8 text-center text-secondary-500" >Login</h1>
            {error && (
							<div
								className="flex p-4 mb-4 text-sm text-red-500 border border-red-300 rounded-lg bg-black "
								role="alert">
								<svg
									aria-hidden="true"
									className="flex-shrink-0 inline w-5 h-5 mr-3"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
										clipRule="evenodd"></path>
								</svg>
								<span className="sr-only">Info</span>
								<div>{error}</div>
							</div>
						)}
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="block font-semibold text-gray-700 mb-2" for="email">
                        Email Address
                    </label>
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="email" placeholder="Enter your email address"  />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold text-gray-700 mb-2" for="password">
                        Password
                    </label>
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="Enter your password"  />
                </div>
                        <div className="flex md:flex-row flex-col justify-between item-center gap-4">
                          <p>Don't have an account yet?<a className="text-primary-500 hover:text-secondary-500 duration-300" href="/register"> Sign Up</a></p>
                    
                <div className="mb-6">
                    <button
                        className="bg-secondary-500 hover:bg-opacity-90 duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Login
                    </button>
                    
                </div>
                
                        </div>
            </form>
        </div>
 
  )
}
