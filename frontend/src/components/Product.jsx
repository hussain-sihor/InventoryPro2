import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { MdDelete } from "react-icons/md";
import axiosInstance from "@/lib/axiosInstance";

const Product = ({ data, count }) => {
	// console.log(data);
	let photoUrl = data.photo;
	let productValue = data.price * data.quantity;
	let status = data.status;
  
	const handleDelete = async(id) =>{
	   await axiosInstance.delete(`/products/deleteproduct/${id}`).then((response)=>{
			window.location.reload(false)
			console.log(response);
		 })
	}
	return (
		<div
			className="w-full h-[65px] grid
    grid-cols-9  border-t-0 border-l-0 border-r-0 border-dashed border-[1px] border-white "
		>
			<div className="grid col-span-4   h-full w-full ">
				<div className="flex w-full h-full justify-start items-center  gap-3">
					<div className=" w-[10%] h-full  flex justify-center items-center">
						<h1 className="text-md font-semibold text-white">{count}</h1>
					</div>

					<div className=" w-[15%] h-[50px] ">
						<img
							src={photoUrl}
							alt="str"
							className=" h-full w-full rounded-lg border-[1px] border-gray-300 bg-yellow-800"
						/>
					</div>

					<div className="w-[20%] flex justify-start ">
						<h1 className="text-sm font-medium pl-2 pr-2 pt-1 pb-1 rounded-md border-[1px] border-dashed border-white text-white">
							{data.category}
						</h1>
					</div>

					<h1 className="text-lg font-semibold w-[55%] overflow-hidden h-full flex justify-start items-center capitalize text-white">
						{data.name}
					</h1>
				</div>
			</div>

			{/* Price  */}
			<div className="grid col-span-1 justify-center items-center  h-full w-full">
				<h1 className="text-md font-medium w-full  text-white">
					{data.price} $
				</h1>
			</div>

			{/* Quantity  */}
			<div className="grid col-span-1 gap-2  justify-center items-center  w-full h-full">
				<h1 className="text-md font-medium text-white">{data.quantity} </h1>
			</div>

			{/* Reorder level  */}
			<div className="grid col-span-1   justify-center items-center  w-full h-full">
				<h1 className="text-md font-medium text-white">{data.level}</h1>
			</div>

			{/* Status  */}
			<div className="grid col-span-1 w-full h-full items-center pl-5">
				{status == "Out of Stock" && (
					<div className="pl-2 pr-2 rounded-lg pt-1 pb-1 bg-optional w-[80%] flex justify-center items-center">

						<h1 className="text-md font-medium text-white">{status} </h1>
					</div>
				)}

				{status == "Low" && (
					<div className="pl-2 pr-2 rounded-lg pt-1 pb-1  bg-red-600 w-[80%] flex justify-center items-center">
						<h1 className="text-md font-medium text-white">{status} </h1>
					</div>
				)}

				{status == "Mid" && (
					<div className="pl-2 pr-2 rounded-lg pt-1 pb-1  bg-yellow-500 w-[80%] flex justify-center items-center">
						<h1 className="text-md font-medium text-white">{status} </h1>
					</div>
				)}

				{status == "High" && (
					<div className="pl-2 pr-2 rounded-lg pt-1 pb-1  bg-green-600 w-[80%] flex justify-center items-center">
						<h1 className="text-md font-medium text-white">{status} </h1>
					</div>
				)}

			</div>

			{/* Value  */}
			<div className="grid col-span-1 h-full ">
				<div className=" flex justify-end items-center gap-8 w-full h-full pr-3">
					<h1 className="text-md font-medium text-white">{productValue} $</h1>

					{/* Three dots  */}
					<div className="text-xl cursor-pointer">
					<MdDelete className='text-xl text-red-400 cursor-pointer' onClick={()=>{
						handleDelete(data._id);
					}}/>
						{/* <Popover>
						<PopoverTrigger className="text-white"><BsThreeDots /></PopoverTrigger>
						<PopoverContent className="bg-black text-white flex flex-col gap-2">	

						<div className="flex justify-start items-center w-full gap-4 ">
						<div className="capitalize">{data.name}</div>
						<MdDelete className='text-xl text-red-400 cursor-pointer'/>
						</div>
						
						<div className="flex justify-start items-center w-full gap-4 ">
						<div className="">Price : {data.price}</div>
						<input type="number" />
						</div>
						</PopoverContent>
					
					</Popover> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;
