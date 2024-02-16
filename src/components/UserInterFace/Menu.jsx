import React from 'react'
import { AiOutlineHeart } from "react-icons/ai";
import Link from 'next/link';

const Menu = ({img, id, title, prices}) => {
  return (
    <Link href={`/${id}`}>
    <div className='relative w-[180px] h-[150px]'>
    <img
    className='rounded-t-lg h-[100px] object-cover w-[100%]'
     src={img} alt="" />
   <div className='flex'>
    <div className='bg-white pl-1 w-[180px] rounded'>
   <h4 className='font-semibold text-yellow-700'>{title}</h4>
   <p className='font-semibold'>Ksh. {prices}</p>
    </div>
    <AiOutlineHeart className='bg-white text-[26px] cursor-pointer absolute top-1 p-1 right-1 rounded-full ml-4' />
   </div>
  </div>
    </Link>
  )
}

export default Menu