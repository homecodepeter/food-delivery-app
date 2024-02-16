import Link from 'next/link'
import React from 'react'
import Btns from '../MenuInterFace/Btns'
import ButtonForCloseAndOpen from './ButtonForCloseAndOpen'
import { MdEdit } from 'react-icons/md'

const getDate = async () => {
  const res = await fetch("http://localhost:3000/api/category", {
      cache: "no-store",
    });
  return res.json();
}

const Category = async () => {
  const data = await getDate();
  // const reversed = data.reverse();

  return (
    <div className=''>
         <div className='flex relative justify-between items-center'>
        <div>
         <h2 className='font-bold'>Restaurent Category</h2>
        </div>
        <div>
       {/* <ButtonForCloseAndOpen /> */}
        </div>
         </div>
         <div className="mt-4 gap-2 grid grid-cols-2">
            {data.map(res => (
              <div key={res._id} className='flex border items-center mb-2'>
                <div className='w-[180px] h-[100px] '>
                  <img src={res.img} alt=""
                  className='w-[100%] h-[100%] rounded object-cover'
                   />
                </div>
                <div className='ml-4 flex gap-4'>
                <h2 className='mb-4 font-bold block'><span className='font-bold text-yellow-600'>CategoryName: </span>{res.category}</h2>
                  <div className='items-center w-[30px]'>
                   <Btns id={res._id} name="category" />
                    <Link href={`/category/edit/${res._id}`}>
                      <MdEdit className='text-[24px]' />
                    </Link>
                    </div>
                  </div>
                </div>
            ))}
         </div>
    </div>
  )
}

export default Category