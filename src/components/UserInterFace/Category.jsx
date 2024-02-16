"use client";

import React from "react";
import axios from "axios";

const Category = ({img, category, id, setCategoryList, setIsLoading, setSelectedCategory, selectedCategory}) => {
  
  const handleCategorySelected = async (category) => {
      const response = await axios.post(
        `http://localhost:3000/api/findByName`,
        { 
          name: category.category
        }
      );
      setCategoryList(response.data);
      setIsLoading(false);
      setSelectedCategory(category.category);
  }

  return (
    <button
    onClick={() => handleCategorySelected(category)}
     className='grid justify-center mr-4'>
      <div className={`w-[60px] flex justify-center items-center h-[60px] m-auto rounded ${category.category === selectedCategory ? "bg-blue-500" : ""}`}>
    <img
       className={`rounded cursor-pointer relative w-[50px] h-[50px] object-cover`}
        src={img} alt="" />
      </div>
        <div className="max-w-md">
    <h2 className="font-semibold"  style={{ whiteSpace: "nowrap" }} >{category.category}</h2>
        </div>
     </button>
  )
}

export default Category