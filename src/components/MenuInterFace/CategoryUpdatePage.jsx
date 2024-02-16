"use client"

import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";

const CategoryUpdatePage = ({id, category, Img}) => {
  // State for managing form inputs
  const [categoryName, setCategoryName] = useState(category);
  const [img, setImg] = useState(Img);
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
  
        const imageUrl = response.data.secure_url;
        setImg(imageUrl);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  // Function to handle form submission
  const handleFormSubmit = async (e) => {     
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/api/category/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({categoryName, img})
      })
  
      if (res.ok) {
          router.push("/category");
          router.refresh();
      } else {
        throw new Error("Failed to Update Category");
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <h1 className="text-2xl font-semibold mb-4">Update Category</h1>

        {/* Category Update Form */}
        <form onSubmit={handleFormSubmit}>
          {/* Category Name Input */}
          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-gray-700 font-bold mb-2">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              className="border border-gray-300 p-2 w-full rounded"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>

          {/* Category Image Input */}
          {/* <div className="mb-4">
            <label htmlFor="categoryImage" className="block text-gray-700 font-bold mb-2">
              Category Image
            </label>
            <input
              type="file"
              id="categoryImage"
              className="border border-gray-300 p-2 w-full rounded"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </div> */}
          <div className='mt-4 block w-[100%] mb-4 p-3 border-dashed border-2 border-yellow-500'>
      <label htmlFor="dish" className='h-[40px] font-medium'>
        {img ? <p>{img.slice(0,30)}.....</p> : <p>Upload Category Image</p>}
      </label>
      <input
        type="file"
        id="dish"
        onChange={handleImageUpload}
        className='w-[100%] hidden h-[40px] outline-none pl-3 rounded-md mt-3'
      />
    </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryUpdatePage;
