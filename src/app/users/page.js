// pages/signup.js
"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const router = useRouter();

  const handleUserSign = async () => {
    if (email && password) {
      
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({role, name, email, password})
      })
  
      if (res.ok) {
          router.refresh();
      } else {
        throw new Error("Failed to create a menu");
      }
    
        setRole('');
        setName('');
        setEmail([]);
        setPassword("");
      }
  }

  const getUsers = async () => {
     try {
      const reponse = await fetch(`http://localhost:3000/api/register`);
      const data = await reponse.json();
      setUsers(data)
     } catch (error) {
       console.log(error)
     }
  }


  useEffect(() => {
    getUsers();
  }, []) 



  return (
    <div className='flex bg-gray-100 items-center justify-center'>
      <div className='overflow-x-auto mr-2 h-[450px] w-[400px]'>
      <h2 className='font-bold text-[24px]'>Exist User</h2>
      <div>
        {users?.map(user => (
      <div key={user._id} className='border bg-[#1a1a1a] mt-3 rounded flex items-center justify-between p-4 w-[100%]'>
          <div className=''>
            <h2 className='mb-2 font-semibold text-white'>{user.name}</h2>
            <h2 className='mb-4 font-semibold text-white'>{user.email}</h2>
          </div>
          <h2 className={`${user.role === "Admit" ? "bg-green-500 p-2" : "border border-white p-2"} rounded font-semibold text-white w-[70px]`}>{user.role}</h2>
          <span className='font-bold text-[18px] w-[40px] h-[40px] rounded-full flex justify-center items-center cursor-pointer bg-white'>X</span>
      </div>
        ))}
      </div>
      </div>
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>Sign Up</title>
      </Head>

      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Sign Up</h2>

        {/* Add your sign-up form here */}
        {/* For simplicity, let's just display a message */}
        <p className="text-gray-600 mb-4">
          Welcome to our platform! Please sign up to get started.
        </p>
        {/* Add your form fields and submit logic here */}
            <input type="text"
            onChange={e => setRole(e.target.value)}
             placeholder="Role/waiters/Chef"
             value={role}
              className="mb-4 w-[100%] p-2 border rounded" />
            <input type="text"
            onChange={e => setName(e.target.value)}
            value={name}
             placeholder="Full Name"
              className="mb-4 w-[100%] p-2 border rounded" />
            <input type="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
             placeholder="Email Address" className="mb-4 w-[100%] p-2 border rounded" />
            <input type="password" 
            onChange={e => setPassword(e.target.value)}
            value={password}
            placeholder="Password" className="mb-4 w-[100%] p-2 border rounded" />
           <div>
            <button 
            onClick={() => handleUserSign()}
            className="bg-blue-500 text-white py-2 px-4 rounded">Sign Up</button>
           </div>
      </div>
    </div>
    </div>
  );
};

export default SignUpPage;
