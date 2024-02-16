"use client";

import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from "next/navigation";

const ButtonForCloseAndOpen = () => {
    const [open, setOpen] = useState(false);
    const [img, setImg] = useState(null);
    const [category, setCategory] = useState("");
    const router = useRouter();

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

      const handleCategoryList = async () => {
        if (category && img) {
      
          const res = await fetch("http://localhost:3000/api/category", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({category, img})
          })
      
          if (res.ok) {
              router.refresh();
              setOpen(false);
          } else {
            throw new Error("Failed to create a Category");
          }
        
            setCategory("");
            setImg(null);
          }
      }


  return (
    <div className=''>
    <button  onClick={() => setOpen(true)}
    className='border p-2 rounded-md font-bold'>
        Add Category
    </button>
    {open && (
        <div className='absolute p-4 top-0 left-0 bg-[#1a1a1a]'>
       <div className='w-[100%] mr-3'>
        <div className='flex justify-between'>
      <label htmlFor="category" className='font-semibold text-white'>Category:</label>
       <button 
       onClick={() => setOpen(false)}
       className='bg-white cursor-pointer font-semibold p-2 rounded-full'>X</button>
      </div>
      <input
        type="text"
        id="categroy"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder='category'
        className='w-[100%] mt-3 border h-[40px] outline-none pl-3 rounded-md '
      />
    </div>
    <div className='mt-4 block w-[100%] mb-4 p-3 border-dashed border-2 border-white'>
      <label htmlFor="image" className='h-[40px] font-medium'>
        {img ? <p className='text-white'>{img.slice(0,40)}.....</p> : <p className='text-white'>Upload Category Image Profile or Image Logo</p>}
      </label>
      <input
        type="file"
        id="image"
        onChange={handleCategoryImageUpload}
        className='w-[100%] hidden h-[40px] outline-none pl-3 rounded-md mt-3'
      />
    </div>
    <button onClick={handleCategoryList}
    className='bg-white p-2 rounded'
    >Add Category</button>
         </div>
    )}
    </div>
  )
}

export default ButtonForCloseAndOpen