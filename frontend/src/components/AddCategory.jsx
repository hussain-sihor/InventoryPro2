import axiosInstance from '@/lib/axiosInstance';
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";

// name
// author
// desc

const AddCategory = () => {
   
  const [employee,setEmployee] = useState({});


	const toastOptions = {
		position: "bottom-right",
		theme: "dark",
		pauseOnHover: false,
		draggable: true,
		autoClose: 4000,
	};

  const [data, setData] = useState({
		name: "",
    desc:"",
    author:"",
	});


  useEffect(()=>{
				const getUserInfo = async () => {
					const token = localStorage.getItem("token");
					await axiosInstance
						.get("/users/getuser", {
							headers: {
								Authorization: `Bearer ${token}`,
							},
						})
						.then((response) => {
							setEmployee(response.data.user);
						});
				};
				getUserInfo();
	},[])

  const handleSubmit = async(event) => {
		event.preventDefault();
		// console.log(data)
		try{
			const token = localStorage.getItem("token");
			await axiosInstance.post("/categories/addcategory", {
				name:data.name,
				desc:data.desc,
				author:employee._id,
				},{headers: {
					Authorization: `Bearer ${token}`,
				},})
			.then((response) => {
					// console.log(response);
				if(response.status==200){
					setData({		
						name: "",
						desc:"",
						author:employee.name})
						window.location.reload(false)
				}
			});
		}catch(error){
			toast.error(error.response.data.message, toastOptions);
		}
		
	};

	return (
		<div className="w-full h-full flex justify-center items-center ">

			<div className="w-full h-full flex items-start justify-center gap-10  pl-3 pr-3 pt-8 pb-2  flex-col rounded-xl border-[2px] border-tertiary border-dashed">

			<div className="text-xl font-bold text-white  mb-6 h-[5%]">
          Add Category
        </div>
				
				<div
					className="flex flex-col gap-7 w-full h-full justify-start  items-between  rounded-xl"

				>
					<div className="flex gap-6 text-white">
						<div className="flex flex-col gap-1 w-[50%]">
							<label htmlFor="name" className="font-semibold text-gray-300 text-md ">
								Title :
							</label>
							<input
								value={data.name}
								onChange={(e) => setData({ ...data, name: e.target.value })}
								type="text"
								className="rounded-lg p-1 w-full  border-white border-[1px] text-lg bg-black "
							/>
						</div>
					</div>

          <div className="flex flex-col gap-1 text-white">
          <label htmlFor="desc" className=" text-gray-300 text-md font-semibold">Description :
							</label>
           <textarea value={data.desc}
								onChange={(e) => setData({ ...data, desc: e.target.value })}
								type="text" rows={3} className="rounded-lg p-1 w-full border-white border-[1px] bg-black text-lg"></textarea>
          </div>

          <div className="flex gap-4 items-center">
						<div className="flex flex-col gap-1 w-[30%] ">
            <button
						onClick={handleSubmit}
						className="pl-2 pr-2 pt-1 pb-1 rounded-md font-semibold border-[1px] border-white bg-white  text-black text-lg hover:bg-gray-300"
					>
						Save
					</button>
          </div>
          <div className="flex w-[70%] text-white">

					<div className="font-semibold text-white capitalize justify-start items-start">
									Author: <span className="text-lg text-optional">{employee.name}</span>
									</div>

						</div>
					

						
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddCategory
