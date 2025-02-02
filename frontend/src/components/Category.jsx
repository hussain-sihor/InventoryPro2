import React from 'react'
import { MdDelete } from "react-icons/md";
import dateFormat from 'dateformat';


const Category = ({data,onclick}) => {
  const date = dateFormat(data.createdAt, "dS mmmm yyyy")
  return (
    <div className=' w-full flex  gap-8  border-b-[1px] border-white border-dashed pt-2 pb-2 pl-2 pr-2'>

      <div className='flex flex-col gap-2  justify-center items-start w-[30%] text-white  '>
         <h1 className='text-xl font-bold capitalize'>{data.name}</h1>
         <h1 className='text-sm font-semibold flex flex-col pr-2 pl-2 pt-[1px] pb-[1px] border-dashed border-[1px] border-white capitalize'>{data.author}</h1>
      </div>

<div className=" w-[50%]  text-sm font-medium  text-white min-h-[130px] flex justify-start items-center ">
        <h1 className='text-white'>{data.desc}</h1>
</div>
  

      <div className="flex flex-col gap-3 justify-center items-center w-[20%] ">

      <span className=' font-semibold text-md text-white'>{date}</span>
        <MdDelete className='text-2xl text-optional cursor-pointer' onClick={()=>{
          onclick(data._id)
        }}/>
      </div>
       
    </div>
  )
}

export default Category
