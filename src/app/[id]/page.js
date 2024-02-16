import DetailsPage from '@/components/Detailspage/DetailsPage';
import React from 'react'

const getDetailMenu = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/menu/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data (status ${res.status})`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null; // or handle the error in a way that makes sense for your application
  }
};

const page = async ({params}) => {
  const { id } = params;
  const singleData = await getDetailMenu(id);
  return (
    <div>
      <DetailsPage singleData={singleData} />
    </div>
  )
}

export default page