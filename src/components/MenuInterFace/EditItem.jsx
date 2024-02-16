"use client";

import React from 'react'
import { useState } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios"

export default function EditItem({id, Title, Desc, Prices, Category, Subcategory, CategoryImg, Dish}) {
  const [title, setTitle] = useState(Title);
  const [prices, setPrice] = useState(Prices);
  const [dish, setDish] = useState(Dish);
  const [categoryImg, setImg] = useState(CategoryImg);
  const [category, setCategory] = useState(Category);
  const [subcategory, setSubCategory] = useState(Subcategory);
  const [desc, setDesc] = useState(Desc);
  const router = useRouter();
  
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

        console.log(response.data)
  
        const imageUrl = response.data.secure_url;
        setDish(imageUrl);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleCategoryImageUpload = async (e) => {
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
        setImg(imageUrl);
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  
  const handleChangeEvent = (event) => {
    const value = event.target.value;
    setCategory(value);
  }

  const UpdatedMenu = async () => {
    if (title && desc) {
      
    const res = await fetch(`http://localhost:3000/api/menu/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({title, desc, price, category, subcategory, categoryImg, dish})
    })

    if (res.ok) {
        router.push("/menu");
        router.refresh();
    } else {
      throw new Error("Failed to create a menu");
    }
  
      setTitle('');
      setDesc('');
      setPrice("");
      setCategory("");
      setSubCategory("");
      setDish(null);
      setImg(null);
    }
  };
  return (
    <div className="flex items-center justify-center">
    <div className='md:w-[80%] sm:w-[400px] shadow-2xl h-[100vh] rounded-md p-3'>
    <h1 className='font-bold text-yellow-700'>""""Feel free to enrich your dining experience by adding any dish of your choice to the restaurant menu""""</h1>
    <div className='md:block'>
    <div className='md:flex mt-2'>
    <div className='w-[100%] mr-3 mb-4 mt-3'>
      <label htmlFor="category" className='font-semibold'>Category:</label>
      <div>
      <input value={category}
       className='md:w-[100%] border sm:w-[100%] h-[40px] outline-none pl-3 rounded-md'
       onChange={e => setCategory(e.target.value)} />
      </div>
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
              value={prices[0]}
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`border h-[40px] pl-2 outline-none mr-3 rounded w-[100%]`}
              type="number"
              value={prices[1]}
              placeholder="Medium/half"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`border h-[40px] pl-2 outline-none rounded w-[100%]`}
              type="number"
              value={prices[2]}
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
      </div>
    <button onClick={UpdatedMenu} className='p-2 bg-green-600 mt-3 text-white rounded'>
      Update Item
    </button>
    </div>
    </div>
  )
}

