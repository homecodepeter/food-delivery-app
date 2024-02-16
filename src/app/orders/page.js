"use client"

import Link from 'next/link'
import React, {useState, useEffect} from 'react';
import { IoArrowBack } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from '@/libs/firebase';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    console.log(orders)

    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
        const ordersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
      });
  
      return () => unsubscribe(); 
    }, []);


    const handleDishRemove = async (orderId) => {
      try {
        // Delete the document with the specified orderId
        await deleteDoc(doc(db, 'orders', orderId));
      } catch (error) {
        console.error('Error removing document: ', error);
      }
    }

  return (
    <div className='flex h-full justify-center relative'>
        <div>
      <div className='bg-gray-100 p-2 w-[400px] h-[100vh] overflow-y-auto shadow-2xl'>
        <div className='mt-4 flex justify-between items-center'>
          <Link href="/" 
          className='bg-green-700 rounded w-[30px] h-[30px] flex justify-center items-center'
         ><IoArrowBack className='text-[20px] text-white' />
         </Link>
           <div className=''>
          <h2 className='font-bold text-[20px]'>TODAY's Orders</h2>
           </div>
           <div className='relative mr-6'>
            <FaBell className='text-[22px]' onClick={() => playAudio()} />
            <p className='absolute -top-4 w-[23px] font-bold text-white flex justify-center items-center bg-red-700 h-[23px] p-2 rounded-full -right-2'>{orders.length}</p>
           </div>
        </div>
        <div className="gap-8">
        {orders?.map((order) => (
          <div key={order.id} className="bg-white mb-2 mt-2 p-4 rounded-lg shadow-md">
            <div className='mb-2 border-b-2 pb-2 w-[100%] flex justify-between'>
              <div className='flex'>
                <h2 className='font-bold mr-2 text-yellow-700'>{order.dish}</h2>
                <h2 className='font-bold text-yellow-700'>#{order.table}</h2>
                </div>
              <div className='flex bg-white'>
                <h2 className='font-semibold mr-2'>19:03</h2>
                <h2 className='font-semibold'>M.10</h2>
                </div>
              </div>
              {order?.items?.map((item, index) => (
              <div key={index} className=''>
              <div className='flex items-center justify-between'>
                <div>
              <h2 className="text-lg font-bold mb-2">{item.title}</h2>
              <p className="text-gray-600">${item.prices} x {item.quantity}</p>
                </div>
              <p className="font-bold">Ksh. {item.prices * item.quantity}</p>
            </div>
            
            {item?.extras?.map(option => (
            <div key={option._id} className='flex border-b-2 items-center justify-between'>
            <div>
          <h2 className="text-lg font-bold mb-2">{option.title}</h2>
          <p className="text-gray-600">${option.prices[0]} x {item.optionQuantities[option._id]}</p>
            </div>
          <p className="font-bold">Ksh. {option.prices[0] * item.optionQuantities[option._id]}</p>
        </div>
            ))}
            </div>
             ))}
                <div className=''>
                  {order.dish === "Take Away" && (
                <div className='mt-2 mb-2'>
                  <p className='font-bold'>Name: <span className='text-blue-500'>{order.name}</span></p>
                  <p className='font-bold'>number: <span className='text-blue-500'>{order.phoneNumber}</span></p>
                  <p className='font-semibold'>Message: <span className='text-[14px] text-red-700'>{order.note}</span></p>
                  </div>
                  )}
                  <div>
            <p className="text-green-700 font-semibold mt-2">Ksh. {order.total}</p>
            <button
              className="mt-4 bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
              onClick={() => handleDishRemove(order.id)}
            >
              dish served
            </button>    
            </div>       
            </div>
          </div>
          
        ))}
      </div>
      

            </div>
         </div>
    </div>
  )
}

export default Orders