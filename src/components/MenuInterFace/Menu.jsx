import Link from 'next/link'
import React from 'react'
import Btns from './Btns';
import { MdEdit } from 'react-icons/md';

const getDate = async () => {
  const res = await fetch("http://localhost:3000/api/menu", {
      cache: "no-store",
    });
  return res.json();
}

const Menu = async () => {
  const data = await getDate();
  // const reversed = data.reverse();

  return (
    <div className=''>
         <div className='flex justify-between items-center'>
        <div>
         <h2 className='font-bold'>Restaurent Menu</h2>
        </div>
        <div>
        <button className='border p-2 rounded-md font-bold'>
            <Link href="/addMenu">
                Add Menu
            </Link>
        </button>
        </div>
         </div>
         <div className="mt-4">
            {data.map(menu => (
              <div key={menu._id} className='flex border items-center mb-4'>
                <div>
                  <img src={menu.dish} alt=""
                  className='w-[180px] h-[100px] rounded object-cover'
                   />
                </div>
                <div className='ml-2 gap-4'>
                <h2 className='mb-4 font-bold'><span className='font-bold text-yellow-600'>Title: </span>{menu.title}</h2>
                <p className='font-semibold'><span className='font-bold text-yellow-600'>Price: </span>ksh. {menu.price}</p>
                  </div>
                <div className='ml-8 gap-5'>
                <h2 className='mb-4 font-bold'><span className='font-bold text-yellow-600'>Category: </span> {menu.category}</h2>
                  </div>
                  <p className='ml-3 w-[130px]'><span className='font-bold text-yellow-600'>Created At: </span> {new Date(menu.createdAt).toLocaleString().slice(0,11)}</p>
                  <div className='ml-2 grid items-center gap-4'>
                   <Btns id={menu._id} name="menu" />
                   <Link href={`/edit/${menu._id}`}>
                      <MdEdit className='text-[24px]' />
                    </Link>
                  </div>
                </div>
            ))}
         </div>
    </div>
  )
}

export default Menu