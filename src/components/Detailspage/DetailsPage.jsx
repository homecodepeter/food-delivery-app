"use client"

import Nevbar from '@/components/Nevbar'
import Link from 'next/link'
import React, {useEffect, useState} from 'react';
import { IoArrowBack } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { setOrders } from '@/state/menuList/menuSlice';
import { GiFullPizza } from "react-icons/gi";
import { useRouter } from 'next/navigation';
import axios from 'axios';

const DetailsPage = ({singleData}) => {
    const [price, setPrice] = useState(singleData.prices[0]);
    const [prices, setPrices] = useState(singleData.prices[0]);
    const [size, setSize] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [optionQuantities, setOptionQuantities] = useState({});
    const [showOptionQuanity, setShowOptionQuantity] = useState([]);
    const [extras, setExtras] = useState([]);
    const [drinks, setDrinks] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const router = useRouter();

    console.log(singleData.prices.length >= 0)

    const getTotalAmount = () => {
      const itemTotal = prices * quantity;
    
      const extrasTotal = extras.reduce(
        (extraTotal, extra) =>
          extraTotal + extra.prices[0] * (optionQuantities[extra._id] || 0),
        0
      );
    
      return itemTotal + extrasTotal;
    };
    

    const getTheDrinksForSuggestion = async () => {
      const response = await axios.post(
        `http://localhost:3000/api/findByName`,
        { 
          name: "fresh juices"
        }
      );
      setDrinks(response.data);
      setIsLoading(false);
    }

    useEffect(() => {
       getTheDrinksForSuggestion();
    }, [])

    const changePrice = (number) => {
        setPrice(price + number);
      };

    const handleSize = (sizeIndex) => {
        const difference = singleData.prices[sizeIndex] - singleData.prices[size];
        setSize(sizeIndex);
        changePrice(difference);
        setPrices(singleData.prices[sizeIndex])
      };

      const handleChange = (e, option) => {
        const checked = e.target.checked;
  
        if (checked) {
          changePrice(option.price);
          setExtras((prev) => [...prev, option]);
          setShowOptionQuantity([...showOptionQuanity, option._id]);
        } else {
          changePrice(-option.price);
          setExtras(extras.filter((extra) => extra._id !== option._id));
          setShowOptionQuantity(showOptionQuanity.filter((quantity) => quantity !== option._id));
        }
      };

      const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
      };

      const optionIncrementQuantity = (id) => {
        if (id) {
          setOptionQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: (prevQuantities[id] || 0) + 1,
          }));
        }
      };

      const decrementQuantity = () => {
        if (quantity > 1) {
          setQuantity((prevQuantity) => prevQuantity - 1);
        }
      };

      const optionDecrementQuantity = (id) => {
        if (id && optionQuantities[id] > 1) {
          setOptionQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: prevQuantities[id] - 1,
          }));
        }
      };
      const addToCart = () => {
        const { dish, title, _id} = singleData;
        router.replace('/');
        router.replace('/?cartOpen=true');
        dispatch(setOrders({dish, title, _id, extras, prices, price, quantity, optionQuantities }));
      }

  return (
    <>
    {isLoading ? (
      <div className='flex justify-center items-center'>
        <h2>
        loading....
       </h2>
      </div>) : (
    <div className='flex h-full justify-center relative'>
       <div className='w-2/6 hidden transition-transform -translate-x-full sm:translate-x-0'>
        <Nevbar/>
       </div>  
        <div>
      <div className=' w-[400px] bg-gray-100 overflow-y-auto shadow-2xl'>
        <div className='p-2 mt-2'>
          <div className='relative'>
        <img 
        src={singleData?.dish}
        alt=""
        className='w-[100%] object-cover rounded h-[180px]'
         />
         <Link href="/" 
         className='absolute bg-green-700 p-1 rounded top-2 left-2'
         ><IoArrowBack className='text-[24px] text-white' />
         </Link>
                </div>
      <div className='flex justify-between relative'>
        <div className='mt-2'>
         <h2 className='font-semibold mb-2'>{singleData?.title}</h2>
         <h4 className='font-bold text-yellow-700'>Ksh. {prices}</h4>
            </div>
            <div className='flex z-10 justify-center'>
                <button  onClick={() => decrementQuantity()}
                className='w-[30px] h-[30px] mr-2 bg-red-700 text-white text-[20px] rounded-full'>-</button>
                <h2 className='mr-2 font-bold text-[22px]'>{quantity}</h2>
                <button 
                onClick={() => incrementQuantity()}
                className='w-[40px] h-[40px] bg-blue-500 text-white text-[20px] rounded-full'>+</button>
            </div>
      </div>
      {singleData.prices.length > 0 && singleData.category !== "Pizza" && (
  <div className='flex mt-3 w-[100%] overflow-y-auto'>
    {singleData.prices.map((price, index) => (
      <div key={index}>
        <button
          onClick={() => handleSize(index)}
          className={`${
            prices === price 
              ? "bg-blue-500 text-white"
              : ""
          } p-2 font-semibold text-[16px] mr-2 rounded`}
        >
          {price} {/* Display the actual price */}
        </button>
      </div>
    ))}
  </div>
)}

{singleData.category === "Pizza" && (
  <div className='flex mt-3 w-[100%] overflow-y-auto'>
    {singleData.prices.map((price, index) => (
      <div key={index}>
        <button
          onClick={() => handleSize(index)}
          className={`border ${
            size === index
              ? "bg-blue-500 text-white"
              : "bg-yellow-700 text-white"
          } p-2 font-semibold text-[16px] mr-2 rounded-full`}
        >
          <GiFullPizza style={{ fontSize: `${30 + index * 10}px` }} />
        </button>
      </div>
    ))}
  </div>
)}
      <div className='mt-3'>
           <p>
           {singleData?.desc}
           </p>
      </div>
      <div className='mt-3'>
        {
         ["Pasta", "Rice", "Quick Bites"].includes(singleData.category) && (
            <>
        <h2 className='font-bold'>ANY DRINKS WITH</h2>
        <div className='flex overflow-y-auto'>
            {/*  */}
            {drinks?.map((option) => (
        <button key={option._id} className='mr-6 ml-3 grid justify-center cursor-pointer'>
          <div className='relative flex justify-center'>
         <img 
         src={option.dish}
         alt=''
         className='w-[50px] m-auto h-[50px]'
         />
         {showOptionQuanity.includes(option._id) && (
           <div className='flex absolute top-6 items-center z-30 justify-center'>
                <button  onClick={() => optionDecrementQuantity(option._id)}
                className='w-[20px] flex justify-center items-center h-[20px] mr-2 bg-yellow-700 text-white text-[20px] rounded-full'>-</button>
                <h2 className='mr-2 bg-white flex items-center justify-center rounded-full w-[20px] h-[20px] font-bold text-[18px]'>{optionQuantities[option._id] || 0}</h2>
                <button 
                onClick={() => optionIncrementQuantity(option._id)}
                className='w-[20px] h-[20px] flex justify-center items-center bg-blue-500 text-white text-[20px] rounded-full'>+</button>
            </div>
         )}
            </div>
         <div className=''>
            <h2 className='font-semibold' style={{ whiteSpace: "nowrap" }} >{option.title}</h2>
            <h3 className='font-semibold text-orange-700' style={{ whiteSpace: "nowrap" }} >ksh. {option.prices[0]}</h3>
            <input
                type="checkbox"
                id={option.title}
                name={option.title}
                className=""
                onChange={(e) => handleChange(e, option)}
              />
         </div>
        </button>
            ))}
        {/* End Of the  */}
        </div>

            </>
          )} 
      </div>
      <div className='mt-3'>
      <p className="text-green-700 font-semibold"><span className='text-black font-bold'>Total Price: </span> Ksh. {getTotalAmount()}</p>
      <button
       className="mt-4 bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
        onClick={() => addToCart()}
            >
              Add to Cart
            </button>
      </div>

      </div>
     </div>

        </div>
    </div>
    )}
    </>
  )
}

export default DetailsPage