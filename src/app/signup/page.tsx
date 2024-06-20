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
        <div className='flex items-center justify-center min-h-screen mx-2'>
            <div className=''>
                <div className='flex flex-col justify-center items-center mb-4'>
                    <h2 className='text-2xl font-extrabold'>Sign Up!</h2>
                    <h4 className='text-xl font-bold'>Enter Personal Information</h4>
                </div>
                <div className='flex justify-between my-4'>
                    <label className='mx-1 text-lg' htmlFor="firstName">First Name</label>
                    <input
                        className='p-2 text-black rounded-md'
                        type="text"
                        id="firstName"
                        placeholder='Adarsh'
                        value={firstName}
                        onChange={handleFirstNameChange}
                    />
                </div>
                <div className='flex justify-between my-4'>
                    <label className='mx-1 text-lg' htmlFor="lastName">Last Name</label>
                    <input
                        className='p-2 text-black rounded-md'
                        type="text"
                        id="lastName"
                        placeholder='Singh'
                        value={lastName}
                        onChange={handleLastNameChange}
                    />
                </div>
                <div className='flex justify-between my-4'>
                    <label className='mx-1 text-lg' htmlFor="email">Email</label>
                    <input
                        className='p-2 text-black rounded-md'
                        type="text"
                        id="email"
                        placeholder='Email'
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className='flex justify-between my-4'>
                    <label className='mx-1 text-lg' htmlFor="password">Password</label>
                    <input
                        className='p-2 text-black rounded-md'
                        type="password"
                        id="password"
                        placeholder='password'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div>
                    <button 
                        className='bg-red-500 p-2 rounded-md w-full' 
                        onClick={handleSubmit} 
                    >
                        Submit
                    </button>
                </div>
                <div className='flex justify-center mt-2'>
                    <p className='text-blue-500 cursor-pointer'>Already have an account? Sign in</p>
                </div>
                {showAlert && <SimpleAlert />} 
            </div>
        </div>
    );
}

export default Page;
