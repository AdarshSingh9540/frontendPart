'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SignUp() {
    const [firstname, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [lastname, setLastName] = useState("");

    
    useEffect(() => {
        console.log(localStorage.getItem('firstName'));
    }, []);

    const handleFirstNameChange = (e:any) => {
        const value = e.target.value;
        setFirstName(value);
        localStorage.setItem("firstname", value); 
    };

    const handleLastNameChange = (e:any) => {
        const value = e.target.value;
        setLastName(value);
        localStorage.setItem("lastname", value); 
    };

    const handleEmailChange = (e:any) => {
        const value = e.target.value;
        setEmail(value);
        localStorage.setItem("email", value); 
    };

    const handlePassChange = (e:any) => {
        const value = e.target.value;
        setPass(value);
        localStorage.setItem("password", value); 
    };

    const handleSignUp = async () => {
        try {
            localStorage.removeItem("firstName");
            const response = await axios.post("https://paytm-basic-backend.vercel.app/api/v1/user/signup", {
                username: email,
                firstname,
                lastname,
                password: pass
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("firstName", firstname);
          
            navigate("/dashboard");
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };
    

    return (
        <div className='bg-slate-300 h-screen flex justify-center'>
            <div className='flex flex-col justify-center'>
                <div className='rounded-lg bg-white w-84 text-center p-4 px-4 h-mamx'>
                    <h1 className="text-xl font-bold mb-4">Sign Up</h1>
                    <p className="text-sm mb-4">Enter your details for signup</p>
                    <div className="mb-4 flex">
                        <label htmlFor="firstName" className="block mb-1 mr-2">First Name:</label>
                        <input type="text" id="firstName" value={firstname} onChange={handleFirstNameChange} className="w-full px-3 py-2 border rounded-md" placeholder="Adarsh" />
                    </div>
                    <div className="mb-4 flex">
                        <label htmlFor="lastName" className="block mb-1 mr-2">Last Name:</label>
                        <input type="text" id="lastName" value={lastname} onChange={handleLastNameChange} className="w-full px-3 py-2 border rounded-md" placeholder="Singh" />
                    </div>
                    <div className="mb-4 flex">
                        <label htmlFor="email" className="block mb-1 mr-2">Email:</label>
                        <input type="email" id="email" value={email} onChange={handleEmailChange} className="w-full px-3 py-2 border rounded-md" placeholder="email" />
                    </div>
                    <div className="mb-4 flex">
                        <label htmlFor="password" className="block mb-1 mr-2">Password:</label>
                        <input type="password" id="password" value={pass} onChange={handlePassChange} className="w-full px-3 py-2 border rounded-md" placeholder="password" />
                    </div>
                    <div className='pt-4 flex flex-col '>
                        <button onClick={handleSignUp} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Sign Up</button>
                        <button className="text-blue-500 hover:text-blue-600 ml-2 my-2" onClick={() => navigate("/signin")}>Already have an account ? Sign in</button>
                    </div>
                    <div>
                        {localStorage.getItem('first')}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
