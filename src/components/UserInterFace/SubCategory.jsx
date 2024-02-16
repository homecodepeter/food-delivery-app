import React from 'react'

const SubCategory = ({selectedCategorys}) => {
  return (
    <div className='flex overflow-x-auto pb-2 mt-5'>
       <h2 className={`${selectedCategorys === true ? "bg-gray-500 text-white rounded p-1" : ""}`}>subtitle1</h2>
       <h2 className='ml-8'>subtitle1</h2>
       <h2 className='ml-8'>subtitle1</h2>
       <h2 className='ml-8'>subtitle1</h2>
       <h2 className='ml-8'>subtitle1</h2>
       <h2 className='ml-8'>subtitle1</h2>
       <h2 className='ml-8'>subtitle1</h2>
       <h2 className='ml-8'>subtitle1</h2>
      </div>
  )
}

export default SubCategory