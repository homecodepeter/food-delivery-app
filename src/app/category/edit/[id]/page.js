import CategoryUpdatePage from '@/components/MenuInterFace/CategoryUpdatePage';
import React from 'react'

const getCategoryById = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/category/${id}`, {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch topic");
      }
  
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

const page = async ({ params }) => {
    const {id} = params;
    const EditCategory = await getCategoryById(id);
    const {category, img, _id } = EditCategory;

  return <CategoryUpdatePage 
           category={category}
           Img={img}
           id={_id}
         />
}

export default page