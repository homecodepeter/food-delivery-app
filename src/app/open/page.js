import HomePage from '@/components/UserInterFace/HomePage'
import MainPage from '@/pages/MainPage'
import React from 'react'

const page = () => {
  return (
    <div className='m-auto p-0'>
        <div className="w-[400px] p-[20px] h-[100vh] overflow-y-auto shadow-2xl sm:ml-64">
       <MainPage />
        </div>
    </div>
  )
}

export default page