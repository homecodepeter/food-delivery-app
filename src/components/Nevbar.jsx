"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { RiRestaurant2Line } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { IoTimeSharp } from "react-icons/io5";
import { HiRectangleGroup } from "react-icons/hi2";
import { FaChevronDown } from "react-icons/fa";
import { signOut } from 'next-auth/react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/libs/firebase";
// import { useSession } from 'next-auth/react';

const Nevbar = () => {
  const [show, setShow] = useState(false)
  const [notification, setNotification] = useState(null)
//   const { data: session } = useSession()
//   console.log("Session",session);

  useEffect(() => {
   const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
     const ordersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
     setNotification(ordersData);
   });

   return () => unsubscribe(); 
 }, []);

  return (
     <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
    <ul className="space-y-2 font-medium">
       <li>
          <Link href="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <IoTimeSharp className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
             <span className="ms-3">Dashboard</span>
          </Link>
       </li>
       <li>
          <button type="button"
          onClick={() => setShow(!show)}
           className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
           <RiRestaurant2Line className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Restaurant</span>
                <FaChevronDown />
          </button>
          <ul id="dropdown-example" className={`${!show ? "hidden py-2 space-y-2" : "py-2 space-y-2"}`}>
                <li>
                   <Link href="/menu" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Menu</Link>
                </li>
                <li>
                   <Link href="/category" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Category</Link>
                </li>
                <li>
                   <Link href="/open" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Open</Link>
                </li>
          </ul>
       </li>
       <li>
          <Link href="/orders" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <HiRectangleGroup className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
             <span className="flex-1 ms-3 whitespace-nowrap">Orders</span>
             <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{notification?.length}</span>
          </Link>
       </li>
       <li>
          <Link href="/users" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <FaUsers className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          <span className="flex-1 ms-3 whitespace-nowrap">Sign Up For New Helper</span>
          </Link>
       </li>
       <li>
          <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <FaArrowRightToBracket className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
             <span className="flex-1 ms-3 whitespace-nowrap"
             onClick={() => signOut()}
             >Sign out</span>
          </Link>
       </li>
    </ul>
    </div>
  )
}

export default Nevbar