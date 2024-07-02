'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import SimpleAlert from '../components/successsignup';

function Page() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const router = useRouter();

    const handleFirstNameChange = (e: any) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e: any) => {
        setLastName(e.target.value);
    }

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post("https://namastequiz-backend.vercel.app/api/auth/signup", {
                email,
                firstName,
                lastName,
                password
            });
            console.log("Form submitted:", { firstName, lastName, email, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify({ firstName, lastName, email }));
            setShowAlert(true);

            setTimeout(() => {
                router.push("/home");
            }, 3000);
        } catch (error) {
            console.error("Error during signup:", error);
        }
    }

    return (
       <div className='flex flex-col justify-center items-center h-screen  '>  
          <div className='bg-slate-800 p-3 lg:p-8 rounded-lg'>
          <div className='text-center '>
            <h1 className='text-2xl font-bold'>Sign up!</h1>
            <p className='text-lg font-semibold'>Enter your details</p>
          </div>
          <div className='m-6'>
          <div >
            <div className=''>
            <label htmlFor="firstname">First Name</label>
            </div>
            <div>
                <input
                value={firstName}
                onChange={handleFirstNameChange}
                className='p-1 rounded-md text-black' 
                type="text"
                 placeholder='Adarsh' />
            </div>
          </div>

          <div className='mt-2'>
            <div>
            <label htmlFor="lasttname">Last Name</label>
            </div>
            <div>
                <input 
                 value={lastName}
                 onChange={handleLastNameChange}
                className='p-1 rounded-md text-black'
                 type="text"
                  placeholder='Singh' />
            </div>
          </div>

          <div className='mt-2'>
            <div>
            <label htmlFor="email">Email</label>
            </div>
            <div>
                <input
                value={email}
                onChange={handleEmailChange}
                className='text-black p-1 rounded-md' 
                type="email"
                 placeholder='adasrh@gmail.com'  />
            </div>
          </div>

          <div className='mt-2'>
            <div>
            <label htmlFor="lasttname">Password</label>
            </div>
            <div>
                <input
                value={password}
                onChange={handlePasswordChange}
                className='text-black p-1 rounded-md' type="password" placeholder='XXXXXX' />
            </div>
          </div>
         

          <div > 
            <button 
             onClick={handleSubmit}
            className='bg-blue-900 p-2 w-full rounded-md  mt-4'>Signup</button>
          </div>
          </div>
          </div>
       </div>
    );
}

export default Page;
