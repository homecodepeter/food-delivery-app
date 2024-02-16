"use client";

import Link from 'next/link';
import React from 'react'
import { MdOutlineCancel, MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";

const Btns = ({id, name}) => {
    const router = useRouter();
    const removeItem = async () => {
      const confirmed = confirm("Are you sure you want to delete this item?");
  
      if (confirmed) {
        const res = await fetch(`http://localhost:3000/api/${name}?id=${id}`, {
          method: "DELETE",
        });
  
        if (res.ok) {
          router.refresh();
        }
      }
    };
  return (
    <div className='block'>
    <button className='' onClick={removeItem}>
    <MdOutlineCancel className='text-[24px]'/>
    </button>
    {/* <button className='mt-3'>
     <Link href={`/edit/${id}`}>
        <MdEdit className='text-[24px]' />
     </Link>
    </button> */}
    </div>
  )
}

export default Btns