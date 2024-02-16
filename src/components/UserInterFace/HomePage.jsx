"use client";

import Menu from "./Menu";
import Category from "./Category";
import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaBell } from "react-icons/fa";
import { FaArrowRightToBracket } from "react-icons/fa6";
import Cart from "../Carts/cart";
import { useSelector } from "react-redux";
import Link from "next/link";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react";
import { useSearchParams } from 'next/navigation';
import axios from "axios";

const HomePage = ({category, menu}) => {
   const [selectedCategory, setSelectedCategory] = useState("Quick Bites"); // Set default selected category
   const [categoryList, setCategoryList] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [cartOpen, setCartOpen] = useState(false);
   const cart = useSelector(state => state.orders);
   const user = useSelector(state => state.user);
   const searchParams = useSearchParams();
   const [notification, setNotification] = useState([]);
   const [orderSuccess, setOrderSuccessful] = useState(false);
   const { data: session } = useSession();

   const random = Math.floor(Math.random() * 3);
   console.log(random);

   useEffect(() => {
    // Check if the cartOpen query parameter is present
    const cartOpen  = searchParams.query;

    if (cartOpen === true) {
      // Open the cart (perform your setCartOpen logic here)
      setCartOpen(true);
    }
  }, [searchParams.query, setCartOpen]);

  const getTheDefaultCategory = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/findByName`, {
        name: "Quick Bites"
      });
      setCategoryList(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching default category: ", error);
    }
  };

  useEffect(() => {
    getTheDefaultCategory();
  }, []);

   useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotification(ordersData);
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <div className='h-full relative'>
      <div className="w-[100%] flex items-center justify-between bg-white">
           <h1 className="font-bold pl-[18px] text-[20px] pt-2 pb-2">Big<span className="text-blue-500">SLice</span></h1>
         <div className="mr-6 flex">
         {session?.user ? (
          <div className="flex items-center">
            <Link href="/orders" className="relative mr-6">
              <FaBell className="text-[20px]" />
              <p className="absolute flex items-center justify-center font-semibold bg-red-700 w-[20px] h-[20px] rounded-full text-white -top-2 -right-3">
                {notification.length}
              </p>
              </Link> 
              <button onClick={() => signOut()} className="flex p-2 cursor-pointer rounded border">
              <FaArrowRightToBracket className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ms-3 font-semibold whitespace-nowrap">Sign out</span>
              </button>
              </div>    
          ): (
            <button onClick={() => setCartOpen(true)}
             className="ml-6 relative">
              <FaShoppingCart className="text-[20px]" />
              <p 
              className="absolute flex items-center justify-center font-semibold bg-blue-500 w-[20px] h-[20px] rounded-full text-white -top-2 -right-3">
                {cart.length}</p>
              </button>
          )}
              {cartOpen && (
                  <div className="absolute w-[100%] top-0 left-0 z-10 h-full bg-white overflow-x-auto p-2">
                    <Cart setCartOpen={setCartOpen} setOrderSuccessful={setOrderSuccessful} />
                    </div>
              )}
                 {
      orderSuccess && (
        <div className='p-4 absolute z-10 items-center m-auto top-[10%] rounded-md left-2 right-2 bg-green-800 justify-center'>
           <span className='font-bold cursor-pointer text-[24px] text-white'
           onClick={() => setOrderSuccessful(false)}
           >X</span>
           <div >
            <p className="text-white font-semibold">Your Order Is Successfull your are OrderNumber 
              <span className=''>450</span>
              </p>
            </div>
        </div>
      )
     }
         </div>
      </div>
      <div className="bg-white flex overflow-y-auto p-[10px]">
        {category?.map(res => (
          <Category 
          key={res._id}
          id={res._id}
          category={res}
          img={res.img}
          setIsLoading={setIsLoading}
          setCategoryList={setCategoryList}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          /> 
        ))}
      </div>
      <div className='grid p-[9px] grid-cols-2 gap-3 mt-2'>
        {selectedCategory === null ? (
          <>
            {menu?.map(res => (
              <Menu
              key={res._id}
              img={res.dish} 
              id={res._id}
              title={res.title.slice(0, 21)}
               prices={res.prices[0]}
               />
            ))}
            </>
        ) : (
          <>
          {isLoading ? (
            <div className="flex w-[100%] h-[100%] items-center justify-center">
               <h2 className="font-semibold">Loading....</h2>
            </div>
            ): (
              <>
              {categoryList?.map(res => (
                  <Menu
                   key={res._id}
                    img={res.dish} 
                    id={res._id}
                    title={res.title.slice(0, 21)}
                     prices={res.prices[0]}
                       /> 
                       ))}  
            </>
          )}
           </>
       )}
        </div>
    </div>
  )
}

export default HomePage