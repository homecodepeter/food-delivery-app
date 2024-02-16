import Category from '@/components/CategoryInterFace'
import Nevbar from '@/components/Nevbar'
import React from 'react'

const page = () => {
  return (
    <div className="flex h-screen">
    <div className='w-2/6 transition-transform -translate-x-full sm:translate-x-0'>
  <Nevbar />
  </div>
      {/* end Of the Nevbar */}
      <div className="flex justify-center w-[100%]">
   <div className="p-4 w-[80%]">
     <Category />
   </div>
  </div>
  </div>
  )
}

export default page