import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox"
import AddOrderList from "@/components/AddOrderList";
import axiosInstance from "@/lib/axiosInstance";

//    orderNumber ,
// 		customerId,
// 		customerName,
//    customerPhone

//    customerEmail
// 		paymentMethod,

// 		  orderDate,
// 		status,

// 		shippingAddress,
// street:"",
// city:"",
// state:"",
// zip:"",
// country:"",
// 		billingAddress,
// 		items,

// 		shippingCost,
// 		discount,
// 		totalAmount,

const Addorder = () => {
	const navigate = useNavigate();
	const toastOptions = {
		position: "bottom-right",
		theme: "dark",
		pauseOnHover: false,
		draggable: true,
		autoClose: 4000,
	};
  const [employee,setEmployee] = useState({});	
	const [totalAmount , setTotalAmount] = useState(0);

	const [data, setData] = useState({
		orderNumber: "",
		customerId: "",
		customerName: "",
		customerPhone: "",
		customerEmail: "",
		paymentMethod: "",
		shippingCost: "",
		discount: "",
		totalAmount: "",
	});
	const [shipping,setShipping] = useState({
		street:"",
    city:"",
    state:"",
    zip:"",
		country:"",
	})


	const [items,setItems] = useState([]);
	const [products,setProducts] = useState([]);


	const saveChange = (quantity,id,price)=>{
		setTotalAmount( totalAmount + parseInt(quantity*price) );
		console.log(totalAmount+(quantity*price));
		setItems(prevItems =>[...prevItems,{"quantity":quantity,"_id":id}]);
	}




	const handleSubmit = async(event) => {
		event.preventDefault();
    const finalVal =  parseInt(totalAmount) + parseInt(data.shippingCost) - parseInt(data.discount);
		if(finalVal > 0){
			setTotalAmount(finalVal);
		}
    
		const token = localStorage.getItem("token");
 try{
	await axiosInstance.post("/orders/addorder", {
		orderNumber:data.orderNumber,
		customerId: data.customerId,
		customerName: data.customerName,
		customerPhone: data.customerPhone,
		customerEmail: data.customerEmail,
		paymentMethod: data.paymentMethod,
		shippingCost: data.shippingCost,
		discount: data.discount,
		totalAmount: totalAmount,
		shippingAddress:shipping,
		items:items,
		author:employee._id
	},{
		headers:{
			Authorization: `Bearer ${token}`,
		}
	})
	.then((response) => {
	toast.success("Order created successfully",toastOptions);
	navigate("/orders");
				
	})
}catch(err){
	console.log(err);
		toast.error(err.response.data.message,toastOptions);
	
}
	};


	
	useEffect(()=>{
		const getProducts = async () => {
			const token = localStorage.getItem("token");
			axiosInstance
				.get("/products/getproducts", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					setProducts(response.data);
				});
		};
		
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

		getProducts();
		getUserInfo();

 },[])


	return (
		<div className="w-full  flex justify-start items-start bg-primary flex-col pl-8 pr-8 pt-4 pb-4">

			<div className="w-full h-[8%] ">
				<h1 className="text-xl font-bold text-white">Add Order</h1>
			</div>

			<div className="h-[92%] w-full flex justify-center items-center ">

				<div className="w-[75vw] h-[100%] flex justify-start items-start pl-5 pr-5 pt-4 pb-4  flex-col gap-5  rounded-xl  ">
					<form
						className="flex flex-col gap-20 w-full h-full justify-center items-between  rounded-xl"
						onSubmit={handleSubmit}
					>
						{/* Customer details  */}
						<div className="flex gap-6 justify-center items-between w-full border-[2px] border-tertiary border-dashed flex-col text-gray-300  p-4 
						rounded-xl text-md bg-op">
							<h1 className="text-md font-semibold" >Customer</h1>

							<div className="flex gap-6">
								<div className="flex flex-col gap-1 w-[50%] text-gray-300 text-md">
									<label htmlFor="customerId" className="font-semibold">
										Customer Id :
									</label>
									<input
										value={data.customerId}
										onChange={(e) =>
											setData({ ...data, customerId: e.target.value })
										}
										type="text"
										className="rounded-md p-1 w-full border-[1px] border-white text-lg bg-black text-white"
									/>
								</div>

								<div className="flex flex-col gap-1 w-[50%] text-gray-300 text-md">
									<label htmlFor="customerName" className="font-semibold">
										Customer Name :
									</label>
									<input
										value={data.customerName}
										onChange={(e) =>
											setData({ ...data, customerName: e.target.value })
										}
										type="text"
										className="rounded-md p-1 w-full border-[1px] border-white text-lg bg-black text-white"
									/>
								</div>
							</div>

							<div className="flex gap-6">
								<div className="flex flex-col gap-1 w-[50%] text-gray-300 text-md">
									<label htmlFor="customerPhone" className="font-semibold">
										Customer Phone :
									</label>
									<input
										value={data.customerPhone}
										onChange={(e) =>
											setData({ ...data, customerPhone: e.target.value })
										}
										type="text"
										className="rounded-md p-1 w-full border-[1px] border-white text-lg bg-black text-white"
									/>
								</div>

								<div className="flex flex-col gap-1 w-[50%] text-gray-300 text-md">
									<label htmlFor="customerEmail" className="font-semibold">
										Customer Email :
									</label>
									<input
										value={data.customerEmail}
										onChange={(e) =>
											setData({ ...data, customerEmail: e.target.value })
										}
										type="text"
										className="rounded-md p-1 w-full border-[1px] border-white text-lg bg-black text-white"
									/>
								</div>
							</div>
						</div>

						{/* Shipping details  */}
						<div className="flex gap-6 justify-center items-start w-full border-[2px] border-tertiary border-dashed flex-col  p-4 rounded-xl">
							<h1 className="text-gray-300 text-md font-semibold">Address</h1>

							<div className=" flex gap-5 w-full">
							
							<div className="flex flex-col gap-1 w-[50%] text-gray-300 text-md">
									<label htmlFor="state" className="font-semibold">
										Country :
									</label>
									<input
										value={shipping.country}
										onChange={(e) =>
											setShipping({ ...shipping, country: e.target.value })
										}
										type="text"
										className="rounded-md p-1 w-full border-[1px] border-white text-lg bg-black text-white"
									/>
								</div>

								<div className="flex flex-col gap-1 w-[50%] text-gray-300 text-md">
									<label htmlFor="state" className="font-semibold">
										State :
									</label>
									<input
										value={shipping.state}
										onChange={(e) =>
											setShipping({ ...shipping, state: e.target.value })
										}
										type="text"
										className="rounded-md p-1 w-full border-[1px] border-white text-lg bg-black text-white"
									/>
								</div>

								<div className="flex flex-col gap-1 w-[50%] text-gray-300 text-md">
									<label htmlFor="city" className="font-semibold">
										City :
									</label>
									<input
										value={shipping.city}
										onChange={(e) =>
											setShipping({ ...shipping, city: e.target.value })
										}
										type="text"
										className="rounded-md p-1 w-full border-[1px] border-white text-lg bg-black text-white"
									/>
								</div>

							</div>

							<div className=" flex gap-5 w-full">
							<div className="flex flex-col gap-1 w-[50%] text-gray-300 text-md">
									<label htmlFor="street" className="font-semibold">
										Street :
									</label>
									<input
										value={shipping.street}
										onChange={(e) =>
											setShipping({ ...shipping, street: e.target.value })
										}
										type="text"
										className="rounded-md p-1 w-full border-[1px] border-white text-lg bg-black text-white"
									/>
								</div>

								<div className="flex flex-col gap-1 w-[50%] text-gray-300 text-md">
									<label htmlFor="zip" className="font-semibold">
										Zip / Postal code :
									</label>
									<input
										value={shipping.zip}
										onChange={(e) =>
											setShipping({ ...shipping, zip: e.target.value })
										}
										type="number"
										className="rounded-md p-1 w-full border-[1px] border-white text-lg bg-black text-white"
									/>
								</div>

								<div className="flex flex-col gap-1 w-[50%] text-gray-300 text-md">
									<label htmlFor="shippingCost" className="font-semibold">
										Shipping Cost :
									</label>
									<input
										value={data.shippingCost}
										onChange={(e) =>
											setData({ ...data, shippingCost: e.target.value })
										}
										type="text"
										className="rounded-md p-1 w-full border-[1px] border-white text-lg bg-black text-white"
									/>
								</div>



							</div>
						</div>

						<div className="flex w-full border-[2px] border-tertiary border-dashed text-white p-4 rounded-xl h-[350px] bg-secondary">

							<div className="flex w-full flex-col gap-3 h-full justify-start items-center">
								<input
									type="text"
									className="border-[1px] w-full rounded-md pt-3 pb-3 pl-3 bg-black text-white border-gray-300 "
									placeholder="Filter orders..."
								/>

								<div className="w-[95%]  gap-7 flex flex-col  overflow-y-scroll scrollbar-hidden pt-2 pb-2  ">
									{products.map((item) => (
										<AddOrderList item={item} handle={saveChange} key={item.createdAt} />
									))}
								</div>
								
							</div>
						</div>

						{/* Final  */}
						<div className="flex gap-6 justify-center items-start w-full border-[2px] border-tertiary border-dashed flex-col  p-4 rounded-xl">

							<div className="flex gap-5 w-full">
								<div className="flex flex-col gap-1 w-[50%] text-gray-300 text-md items-start justify-center">
									<label htmlFor="totalAmount" className="font-semibold">
										Order Number :
									</label>
									<input
										value={data.orderNumber}
										onChange={(e) =>setData({ ...data, orderNumber: e.target.value })
										}
										type="text"
										className="rounded-md p-1 w-full border-[1px] border-white text-lg bg-black text-white"
									/>
								</div>

								<div className="flex flex-col gap-1 w-[50%] text-gray-300 text-md">
									<label htmlFor="discount" className="font-semibold">
										Discount :
									</label>
									<input
										value={data.discount}
										onChange={(e) =>{
											setData({ ...data, discount: e.target.value })
										}
										}
										type="text"
										className="rounded-md p-1 w-full border-[1px] border-white text-lg bg-black text-white"
									/>
								</div>

								<div className="flex flex-col gap-1 w-[50%] text-gray-300 text-md">
									<label htmlFor="paymentMethod" className="font-semibold">
										Payment Method :
									</label>
									<select
										value={data.paymentMethod}
										onChange={(e) =>
											setData({ ...data, paymentMethod: e.target.value })
										}
										name="paymentMethod"
										className="rounded-md p-1 w-full border-[1px] border-white text-lg bg-black text-white"
									>
										<option value="Credit Card">Credit Card</option>
										<option value="Cash on Delivery">Cash on Delivery</option>
									</select>
								</div>

								<div className="flex flex-col gap-1 w-[50%] text-gray-300 text-md">
									<label htmlFor="totalAmount" className="font-semibold">
										Total Amount :
									</label>
									<input
										value={totalAmount}
										readOnly={true}
										onChange={(e) =>
											setData({ ...data, totalAmount: e.target.value })
										}
										type="text"
										className="rounded-md p-1 w-full border-[1px] border-white text-lg bg-gray-900 text-white"
									/>
								</div>
							</div>

							<div className="flex gap-4 items-center w-full ">
								<div className="flex flex-col gap-1 w-[30%] text-white">
									<button
										type="submit"
										className="p-1 rounded-md font-semibold border-[1px]
						border-white bg-white text-black text-lg hover:bg-gray-300"
									>
										Save
									</button>
								</div>
								<div className="flex flex-col gap-1  text-white">
									<div className="font-semibold text-white capitalize justify-start items-center">
									Author: <span className="text-lg text-optional">{employee.name}</span>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Addorder;
