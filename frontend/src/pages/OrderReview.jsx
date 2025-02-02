import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dateFormat from "dateformat";
import OrderReviewList from "@/components/OrderReviewList";
import { GiEgyptianProfile } from "react-icons/gi";
import { BiSolidUserPin } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import DialogDemo from "../components/OrderReviewDialog";
import { Button } from "@/components/ui/button";
import { IoCheckmarkDone } from "react-icons/io5";
import { GiCancel } from "react-icons/gi";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import axiosInstance from "@/lib/axiosInstance";

//    orderNumber ,
// 		customerId,
// 		customerName,
//    customerPhone
//    customerEmail
// 		  orderDate,
// 		status,
// 		paymentMethod,
// 		shippingAddress,
// 		billingAddress,
// 		shippingCost,
// 		items,
// 		discount,
// 		totalAmount,

const OrderReview = () => {
	const [data, setData] = useState({});
	const [products, setProducts] = useState([]);
	const { id } = useParams();
	const navigate = useNavigate();
	const status= useState("pending");


	useEffect(() => {

		const fetchOrderAndProducts = async () => {
			try {
				const token = localStorage.getItem("token");
				const orderResponse = await axiosInstance.get(
					`http://localhost:5000/api/orders/getorder/${id}`,{
						headers:{
							Authorization: `Bearer ${token}`,
						}
					}
				);
				const orderData = orderResponse.data;
				setData(orderData);
				console.log(orderData,"Data");

				const productPromises = orderData.items.map(async (item) => {
					const productResponse = await axiosInstance.get(
						`/products/getproduct/${item._id}`,{
							headers:{
								Authorization: `Bearer ${token}`,
							}
						}
					);
					return {
						product: productResponse.data,
						quantity: item.quantity,
					};
				});

				const productData = await Promise.all(productPromises);
				setProducts(productData);
				console.log(productData,"PRIII");
			} catch (error) {
				console.error("Error fetching order or product data:", error);
			}
		};

		fetchOrderAndProducts();
	}, [id,status]);



	const changeStatus = async () =>{
    //change order status from pending to completed
		//change quantities of products

		const token = localStorage.getItem("token");

		const updatedOrder = {...data,status:"Completed"};
		await axiosInstance.put(`/orders/updateorder/${id}`,updatedOrder,{
			headers:{
				Authorization: `Bearer ${token}`,
			}
		});
 
   const productList = [...products];

		for(let i=0; i<productList.length ; i++){

			productList[i].product.quantity = productList[i].product.quantity - productList[i].quantity
			
		}

		productList.map( async(item) => {
			await axiosInstance.put(`/products/updateproduct/${item.product._id}`,item.product,{
				headers:{
          Authorization: `Bearer ${token}`,
        }
			});
		});		


	}



	const formatedDate1 = dateFormat(data.orderDate, "mmmm d, yyyy");
	const formatedDate2 = dateFormat(data.orderDate, "h:mm tt");

	return (
		<div className="w-full h-[93vh] flex justify-center items-center pl-4 pr-4 pt-4 pb-4 bg-black">
			<div className="w-full h-full flex flex-col">
				{/* Body  */}
				<div className="w-full h-[100%] flex justify-center items-start pl-4 pr-4 pt-4 gap-4">
					{/* Left  */}
					<div className="left w-[60%] h-full flex flex-col justify-center items-center gap-5">
						{/* NavBar  */}
						<div className="nav flex flex-col w-full h-[10%] items-center justify-start text-white gap-2">
							<div className="flex w-full h-full items-center justify-start gap-3">
								<h1 className="text-2xl font-bold">Order ID: {data._id}</h1>

								<div className="bg-yellow-800 pl-2 pr-2 pt-1 pb-1 border-dashed border-[1px] border-white rounded-md text-sm font-medium">
									{data.paymentMethod}
								</div>

								<div className="bg-yellow-800 pl-2 pr-2 pt-1 pb-1 border-dashed border-[1px] border-white rounded-md text-sm font-medium">
									{data.status}
								</div>
							</div>

							<div className="flex w-full h-full items-center justify-start gap-3 text-md font-semibold">
								<h1 className="">
									{formatedDate1} at {formatedDate2} from Draft Orders
								</h1>
							</div>
						</div>

						{/* Order Items  */}
						<div className="top h-[60%] w-full flex flex-col justify-start items-start border-[1px]  border-white rounded-lg ">
							
							<div className="w-full flex justify-start items-center gap-4 h-[20%] border-b-[1px] border-white pl-2 pr-2 pt-1 pb-1 text-white rounded-t-lg">
								<h1 className="text-lg font-bold">Order Items</h1>
                

							
								<div className="bg-slate-300 text-black pl-2 pr-2 pt-1 pb-1 border-dashed border-[1px] border-white rounded-md text-sm font-medium ">
									Order Recieved
								</div> 	
								

								{data.status == "Pending" &&
								<Dialog className="">
									<DialogTrigger asChild>
										<Button
											variant="outline"
											className="text-white bg-black pl-2 pr-2 pt-1 pb-1 text-sm"
										>
											CheckOut
										</Button>
									</DialogTrigger>

									<DialogContent className="sm:max-w-[60%] h-[60%] flex flex-col gap-0 bg-gray-300">
										<DialogHeader className="h-[15%]">
											<DialogTitle className="font-bold ">Products Availibilty</DialogTitle>
											<DialogDescription>
												Cheking products quantity from the inventory.
											</DialogDescription>
										</DialogHeader>
										<div className="flex  w-full h-[70%]  rounded-lg border-[2px] border-black bg-black">
											
											<div className="flex flex-col w-[60%] h-full overflow-y-scroll justify-center">
											
											{products.map((item) =>
												
														<div className="w-full h-[60px] flex justify-between items-center  border-b-[1px] border-t-[1px] border-dashed border-white pl-2 pr-2 pt-1 pb-1 text-white">

															<div className="flex justify-center gap-6">

															
															<div className="flex mr-3 justify-center items-center">
																<h1 className="text-md font-medium">
																	{item.product.name}
																</h1>
															</div>

															<div className="flex gap-2 justify-center items-center">
																<h1 className="text-md font-normal">
																	Required:
																</h1>
																<h1 className="text-md font-semibold">
																	{item.quantity}
																</h1>
															</div>

															<div className="flex gap-2 justify-center items-center">
																<h1 className="text-md font-normal">
																	Available:
																</h1>
																<h1 className="text-md font-semibold">
																	{item.product.quantity}
																</h1>
															</div>

															</div>

															<div className="flex">
																<h1 className="text-xl font-bold text-green-400">
																	<IoCheckmarkDone />
																</h1>
															</div>
			
													</div>
											
												
											)}

											</div>
                      
											<div className="flex w-[40%] h-full justify-center items-center pl-2 pr-2 pt-1 pb-1">
												<h1 className="text-lg font-normal text-slate-300">Click proceed to change the status from <br /><span className="font-semibold text-xl text-white">Pending</span> to <span className="font-semibold text-lg text-white">Completed</span></h1>
											</div>

										</div>
										<DialogFooter className="h-[15%] flex justify-end items-center">
										{<Button type="submit" onClick={changeStatus} className="">Proceed</Button> }
											
										</DialogFooter>
									</DialogContent>

								</Dialog>}

					

								{data.status =="Completed" && 
								<div className="bg-green-500 text-white pl-2 pr-2 pt-1 pb-1 border-dashed border-[1px] border-white rounded-md text-sm font-medium ">
									Order Completed
								</div>}

							

							</div>

							<div className=" h-[80%] w-full overflow-y-scroll flex flex-col justify-start items-center ">
								{products.map((item) => {
									return (
										<OrderReviewList key={item.product.name} data={item} />
									);
								})}
							</div>
						</div>

						{/* Order Summary  */}
						<div className="down h-[40%] w-full flex flex-col justify-start items-start border-[1px] border-white rounded-lg ">
							<div className="flex  w-full h-[25%]  items-center gap-4  text-white border-dashed border-b-[1px] border-white pl-3 pr-3 pt-1 pb-1">
								<h1 className="text-lg font-bold ">Order Summary</h1>
								<div className="bg-slate-300 text-black pl-2 pr-2 pt-1 pb-1 border-dashed border-[1px] border-white rounded-md text-sm font-medium ">
									{data.paymentMethod}
								</div>
							</div>

							<div className="w-full h-[75%] grid grid-cols-2 grid-rows-4 text-white pl-3 pr-3 pt-1 pb-1">
								<div className="col-span-1 grid  justify-start items-center text-md font-medium text-slate-300">
									Subtotal
								</div>
								<div className="col-span-1 grid  justify-end items-center text-md font-medium ">
									$1500
								</div>
								<div className="col-span-1 grid  justify-start items-center text-md font-medium text-slate-300">
									Discount
								</div>
								<div className="col-span-1 grid  justify-end items-center text-md font-medium ">
									-${data.discount}
								</div>
								<div className="col-span-1 grid  justify-start items-center text-md font-medium text-slate-300">
									Shipping
								</div>
								<div className="col-span-1 grid  justify-end items-center text-md font-medium">
									${data.shippingCost}
								</div>
								<div className="col-span-1 grid  justify-start items-center text-md font-bold">
									Total
								</div>
								<div className="col-span-1 grid  justify-end items-center text-lg font-bold">
									${data.totalAmount}
								</div>
							</div>
						</div>
					</div>

					{/* Right  */}
					<div className="left w-[40%] h-full flex justify-center items-start  flex-col pl-3 pr-3 pt-1 pb-1 text-white gap-5">
						{/* Cus Info  */}
						<div className="w-full h-[20%]  rounded-lg border-[1px] border-white pl-2 pr-2 pt-1 pb-1 flex  flex-col gap-1">
							<h1 className="text-lg font-bold mb-2">Customers</h1>

							<div className="flex gap-2 items-center">
								<GiEgyptianProfile className="text-lg" />
								<h1 className="text-md font-normal">{data.customerName}</h1>
							</div>

							<div className="flex gap-2 items-center">
								<BiSolidUserPin className="text-lg" />
								<h1 className="text-md font-normal">{data.customerId}</h1>
							</div>
						</div>
						{/* Cus Contact  */}
						<div className="w-full h-[20%]  rounded-lg border-[1px] border-white pl-2 pr-2 pt-1 pb-1 flex  flex-col gap-1">
							<h1 className="text-lg font-bold mb-2">Contact Information</h1>

							<div className="flex gap-2 items-center">
								<MdEmail className="text-lg" />
								<h1 className="text-md font-normal">
									{data.customerEmail}
								</h1>
							</div>

							<div className="flex gap-2 items-center">
								<FaPhoneAlt className="text-lg" />
								<h1 className="text-md font-normal">{data.customerPhone}</h1>
							</div>
						</div>
						{/* Shipp Addre  */}
						<div className="w-full h-[32%]  rounded-lg border-[1px] border-white pl-2 pr-2 pt-1 pb-1 flex  flex-col gap-0">
							<h1 className="text-lg font-bold mb-2">Shipping Address</h1>

							<div className="flex gap-2 justify-center-center flex-col">
								<h1 className="text-md font-normal">{data.customerName}</h1>
								<h1 className="text-md font-normal">
									{data.shippingAddress && data.shippingAddress.street}
								</h1>
								<h1 className="text-md font-normal capitalize">
									{data.shippingAddress && data.shippingAddress.city}{" "}
									{data.shippingAddress && data.shippingAddress.zip}
								</h1>
								<h1 className="text-md font-normal capitalize">
									{data.shippingAddress && data.shippingAddress.state}{" "}
									{data.shippingAddress && data.shippingAddress.country}
								</h1>
							</div>
						</div>
						{/* Bill Addre  */}
						{data.shippingAddress &&
							data.billingAddress &&
							(data.shippingAddress.street == data.billingAddress.street ? (
								<div className="w-full  pl-2 pr-2 pt-1 pb-1 rounded-lg border-[1px] border-white">
									<h1 className="text-lg font-bold mb-2">Billing Address</h1>
									<h1 className="w-full justify-center">
										Same as Shipping Address
									</h1>
								</div>
							) : (
								<div className="w-full h-[32%]  rounded-lg border-[1px] border-white pl-2 pr-2 pt-1 pb-1 flex  flex-col gap-0">
									<h1 className="text-lg font-bold mb-2">Billing Address</h1>

									<div className="flex gap-2 justify-center-center flex-col">
										<h1 className="text-md font-normal">{data.customerName}</h1>
										<h1 className="text-md font-normal">
											{data.billingAddress && data.billingAddress.street}
										</h1>
										<h1 className="text-md font-normal capitalize">
											{data.billingAddress && data.billingAddress.city}{" "}
											{data.billingAddress && data.billingAddress.zip}
										</h1>
										<h1 className="text-md font-normal capitalize">
											{data.billingAddress && data.billingAddress.state}{" "}
											{data.billingAddress && data.billingAddress.country}
										</h1>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderReview;
