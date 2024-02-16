"use client";

import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios"

export default function AddMenu() {
  const [title, setTitle] = useState('');
  const [prices, setPrices] = useState([]);
  const [dish, setDish] = useState(null);
  const [categoryNames, setCategoryNames] = useState([]);
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState('');
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);
  const router = useRouter();
  console.log(category)

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0]; 
  
    if (file) {
      const cloudinaryData = new FormData();
      cloudinaryData.append('file', file);
      cloudinaryData.append('upload_preset', 'uploads');
  
      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dik4pfdf0/image/upload',
          cloudinaryData
        );
  
        const imageUrl = response.data.secure_url;
        setDish(imageUrl);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleChangeEvent = (event) => {
    const value = event.target.value;
    setCategory(value);
  }

  const getCategoriesNames = async () => {
    const res = await fetch("http://localhost:3000/api/category");
    const data = await res.json();
    const intro = {id: 1, category: "Add Category By Clicking Here"};
    setCategoryNames([intro, ...data]);
  }
 
  useEffect(() => {
        getCategoriesNames();
  }, [])

  const AddMenu = async () => {
    if (title && desc) {
      
    const res = await fetch("http://localhost:3000/api/menu", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({title, desc, prices, category, extraOptions, dish})
    })

    if (res.ok) {
        // router.push("/menu");
        router.refresh();
    } else {
      throw new Error("Failed to create a menu");
    }
  
      setTitle('');
      setDesc('');
      setPrices([]);
      setDish(null);
    }
  };
  return (
    <div className="flex items-center justify-center">
    <div className='md:w-[80%] sm:w-[400px] shadow-2xl h-[100vh] rounded-md p-3'>
    <h1 className='font-bold text-yellow-700'>Feel free to enhance your dining experience with a complimentary
     addition of any dish of your choice to our restaurant menu.</h1>
    <div className='md:block'>
    <div className='md:flex mt-2'>
    <div className='w-[100%] mr-3 mb-4 mt-3'>
      <label htmlFor="category" className='font-semibold'>Category:</label>
      <select id="category"
      onChange={handleChangeEvent}
       className='w-[100%] outline-none h-[40px]'>
      {categoryNames?.map(names => (
          <option
          key={names._id}
          className='font-bold'
          value={names.category}>{names.category}</option>
      ))}
       </select>
    </div>
    </div>
    <div className='md:flex w-[100%]'>  
    <div className='mt-1 w-[100%] mr-3'>
      <label htmlFor="title" className='font-semibold'>Title:</label>
      <div className=''>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='title'
        className='md:w-[100%] border sm:w-[100%] h-[40px] outline-none pl-3 rounded-md'
        />
      </div>
    </div>
    <div className='mt-1 w-[100%]'>
   {/*  */}
    </div>
        </div>
    <div className="mt-2">
          <label className="">Prices</label>
          <div className="flex">
            <input
              className={`border h-[40px] pl-2 outline-none mr-3 rounded w-[100%]`}
              type="number"
              placeholder="Small/full"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`border h-[40px] pl-2 outline-none mr-3 rounded w-[100%]`}
              type="number"
              placeholder="Medium/half"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`border h-[40px] pl-2 outline-none rounded w-[100%]`}
              type="number"
              placeholder="Large/quarter"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
    </div>
    <div className='flex'> 
    <div className='mt-4 block w-[100%] mb-4 p-3 border-dashed border-2 border-yellow-500'>
      <label htmlFor="dish" className='h-[40px] font-medium'>
        {dish ? <p>{dish.slice(0,40)}.....</p> : <p>Upload Dish</p>}
      </label>
      <input
        type="file"
        id="dish"
        onChange={handleImageUpload}
        className='w-[100%] hidden h-[40px] outline-none pl-3 rounded-md mt-3'
      />
    </div>
    </div>
    <div className='mb-3'>
      <label htmlFor="desc" className=' font-semibold'>Description:</label>
      <textarea
        id="desc"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
       className="w-[100%] border outline-none rounded p-2"
       placeholder='description'

      ></textarea>
    </div>
    <div className="">
          <label className="">Extra</label>
          <div className="">
            <input
              className={`border h-[40px] pl-2 rounded w-[40%] mr-3`}
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className={`border h-[40px] pl-2 rounded w-[40%]`}
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button className="bg-blue-400 p-2 rounded-lg text-white font-semibold ml-2" onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className="pt-3 pb-3">
            {extraOptions?.map((option) => (
              <span key={option.text} className="mt-2 mr-2 text-white font-semibold bg-blue-500 p-2 rounded-full">
                {option?.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    <button onClick={AddMenu} className='p-2 bg-green-600 mt-3 text-white rounded'>
      Add New Item
    </button>
    </div>
    </div>
  )
}

