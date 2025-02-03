import React, { useEffect, useState } from "react";
import { FaRegNoteSticky } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { MdVerifiedUser } from "react-icons/md";
import { LuShieldClose } from "react-icons/lu";
import { ImBin2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
const Reminders = () => {

  const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [task, setTask] = useState("");
  const [flag,setFlag] = useState(false)
  const [isOpen,setIsOpen] = useState(false)
	const [employee,setEmployee] = useState({});	
	const [empty,setEmpty] = useState(false);
  
	const handleDelete = (id) => {
		const token = localStorage.getItem("token");
		axiosInstance.delete(`/reminders/deletereminder/${id}`,{
					headers: {
						Authorization: `Bearer ${token}`,
					},
		}).then((res)=>{
			console.log(res);
			setFlag(!flag);
		});
	};

	const handleSave = () => {
    if(task){
			const token = localStorage.getItem("token");
      axiosInstance.post(`/reminders/addreminder`,{
        task,
				author:employee._id
      },{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).then((response)=>{
				setIsOpen(false);
				setFlag(!flag);
				setTask("");
      })
    }
    
	};

	useEffect(() => {
		 const getReminders =async ()=>{
			const token = localStorage.getItem("token");
			axiosInstance.get("/reminders/getreminders",{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					if(response.status == 400){return};

					// console.log(response.data.length);
					if(response.data.length == 0){
						setEmpty(true);
					}
					setData(response.data);
					setIsOpen(true);
				});
		 }
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


getReminders();
getUserInfo();
	}, [flag]);

	return (
		<div className="w-full h-full flex justify-center flex-col items-center gap-2">
			
			<div className="w-full h-[10%] flex justify-between items-center pl-3 pr-3 pt-1 pb-1">

				<div className=" flex gap-3 items-center justify-center text-white">
					<FaRegNoteSticky className="text-xl font-bold" />
					<h1 className="text-lg font-bold">Reminders</h1>
				</div>

				<div className="text-md font-medium">
        {
					isOpen && <Dialog className="">
					<DialogTrigger asChild>
						<Button
							className="text-xl font-bold text-white bg-transparent hover:bg-transparent"
							onClick={() => {}}
						>
							<IoMdAdd  className="text-3xl font-bold text-green-300"/>
						</Button>
					</DialogTrigger>

					<DialogContent className="sm:max-w-[50%] h-[50%] flex flex-col gap-0 bg-gray-300">
						<DialogHeader className="h-[15%]">
							<DialogTitle className="font-bold text-lg">Add Reminder</DialogTitle>
						</DialogHeader>

						<div className="flex  w-full h-[70%]  rounded-lg border-[2px] border-black bg-secondary justify-center items-center">
							
							<div className="flex  gap-3 w-[70%]  items-center">
								<label htmlFor="name" className="font-semibold text-white">
									Task:
								</label>
								<input
									value={task}
									onChange={(e) => setTask(e.target.value)}
									type="text"
									className="rounded-md p-1 w-full border-[1px] border-white text-lg bg-white "
								/>
							</div>

						</div>
						<DialogFooter className="h-[15%] flex justify-end items-center mt-2 ">
							<Button type="submit" onClick={() => {
								handleSave();
							}} className="bg-secondary text-white font-bold text-lg hover:bg-optional border-2 border-optional">
								Save
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
				}
				</div>
			</div>

			{empty ? <div className="flex w-full h-full justify-center items-center text-white text-xl font-bold" >No Reminders Available</div> 
			: 
			<div className="flex w-[95%] h-[85%] flex-col justify-start items-center gap-4 pt-3 overflow-hidden">
				{data.map((item) => (
					<div className="w-full pl-2 pr-2 pt-1 pb-1 h-[50px] flex justify-between items-center rounded-lg border-l-[8px] border-t-[1px] border-b-[1px] border-r-[1px] border-white text-white" key={item._id}>
						<div className=" flex w-[80%] justify-start items-center gap-4 h-full">
							<MdVerifiedUser className="text-xl font-bold text-green-400" />
							<h1 className="text-lg font-semibold">{item.task}</h1>
						</div>
						<div className="flex justify-end items-center w-[20%] h-full">
							<ImBin2
								className="text-md font-bold text-optional cursor-pointer"
								onClick={() => {
									handleDelete(item._id);
								}}
							/>
						</div>
					</div>
				))}
			</div>}

		</div>
	);
};

export default Reminders;
