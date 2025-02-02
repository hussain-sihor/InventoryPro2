import React, { useEffect, useState } from "react";
import { DollarSign, Package2, Album, ArchiveX } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import StatusLabels from "@/components/StatusLabels";

import CategoryChart from "@/components/CategoryChart";
import StatusChart from "@/components/StatusChart";
import Reminders from "@/components/Reminders";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axiosInstance";

const Dashboard = () => {
	const navigate = useNavigate();
	const [products, setProducts] = useState([]);
	const [productNumber, setProductNumber] = useState(0);
	const [categoryNumber, setCategoryNumber] = useState(0);
	const [storeValue, setStoreValue] = useState("");
	const [outOfStock, setOutOfStock] = useState(0);
	const [categories, setCategories] = useState([]);
	const [pieData, setPieData] = useState([]);
	const [statusPie, setStatusPie] = useState([]);

	useEffect(() => {
		const handleRequest = async () => {
			const token = localStorage.getItem("token");

			await axiosInstance
				.get("/products/getproducts", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					setProducts(response.data);
					setProductNumber(response.data.length);
				});

			await axiosInstance
				.get("/categories/getcategories", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					setCategories(response.data);
					setCategoryNumber(response.data.length);
				});
		};

		handleRequest();
	}, []);


	//TOTAL STORE VALUE AND OUT OF STOCK NUMBER
	useEffect(() => {
		let totalValue = 0;
		let outOfStock = 0;
		for (let i = 0; i < products.length; i++) {
			if (products[i].quantity == 0) {
				outOfStock++;
			} else {
				totalValue += products[i].price * products[i].quantity;
			}
		}

		const numformatted = totalValue.toLocaleString("en-IN");
		setStoreValue(numformatted);
		setOutOfStock(outOfStock);
	}, [products]);


	// NUMBER OF CATEGORIES WITH ITEMS COUNT FOR PIE CHART
	useEffect(() => {
		const categoriesList = [];

		for (let i = 0; i < categories.length; i++) {
			var itemsCount = 0;

			for (let j = 0; j < products.length; j++) {
				if (products[j].category == categories[i].name) {
					itemsCount = itemsCount + 1;
				}
			}
			categoriesList[i] = { name: categories[i].name, value: itemsCount };
		}

		setPieData(categoriesList);
	}, [products, categories]);


	// PRODUCTS STATUS PIE CHART
	useEffect(() => {
		var data = [];
		var lowcnt = 0;
		var midcnt = 0;
		var highcnt = 0;
		var outcnt = 0;

		for (let i = 0; i < products.length; i++) {
			if (products[i].status == "Low") {
				lowcnt += 1;
			} else if (products[i].status == "Mid") {
				midcnt += 1;
			} else if (products[i].status == "High") {
				highcnt += 1;
			} else {
				outcnt += 1;
			}
		}
		data = [
			{ name: "HIGH", value: highcnt, color: "text-[#7fff35]" },
			{ name: "MEDIUM", value: midcnt, color: "text-[#ffa673]" },
			{ name: "LOW", value: lowcnt, color: "text-[#edff28]" },
			{ name: "OUT OF", value: outcnt, color: "text-[#ff4141]" },
		];

		setStatusPie(data);
		// console.log("Data",data)
	}, [products]);

	
	return (
		<div className="w-full  bg-primary pl-8 pr-8 pt-4 pb-4 flex flex-col">
			<div className="text-xl font-bold text-white">Inventory Stats</div>

{/* CARDS */}
			<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 pt-5">
				<Card
					x-chunk="dashboard-01-chunk-0"
					className="bg-secondary text-white hover:bg-tertiary hover:text-black"
				>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-md font-medium">
							Total Products
						</CardTitle>
						<Package2 className="h-5 w-5 text-green-300" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{productNumber}</div>
						{/* <p className="text-xs text-muted-foreground text-gray-400 pt-1">
							+20.1% from last month
						</p> */}
					</CardContent>
				</Card>

				<Card
					x-chunk="dashboard-01-chunk-0"
					className="bg-secondary text-white hover:bg-tertiary hover:text-black"
				>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-md font-medium">
							Total Store Value
						</CardTitle>
						<DollarSign className="h-5 w-5 text-lime-300" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">₹ {storeValue}</div>
						{/* <p className="text-xs text-muted-foreground text-gray-400 pt-1">
							+20.1% from last month
						</p> */}
					</CardContent>
				</Card>

				<Card
					x-chunk="dashboard-01-chunk-0"
					className="bg-secondary text-white hover:bg-tertiary hover:text-black"
				>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-md font-medium">
							All Categories
						</CardTitle>
						<Album className="h-5 w-5 text-yellow-300" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{categoryNumber}</div>
						{/* <p className="text-xs text-muted-foreground text-gray-400 pt-1">
							+20.1% from last month
						</p> */}
					</CardContent>
				</Card>

				<Card
					x-chunk="dashboard-01-chunk-0"
					className="bg-secondary text-white hover:bg-tertiary hover:text-black"
				>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-md font-medium">Out of Stock</CardTitle>
						<ArchiveX className="h-5 w-5 text-red-300" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{outOfStock}</div>
						{/* <p className="text-xs text-muted-foreground text-gray-400 pt-1">
							+20.1% from last month
						</p> */}
					</CardContent>
				</Card>
			</div>

{/* FIRST ROW */}
			<div className="w-full flex justify-between items-center h-[400px] pt-9 ">
				<div className="w-[50%] h-full  flex justify-start items-center relative">
					<div className="text-lg font-bold text-white  absolute left-[2%] top-2">
						Categories
					</div>
					<div className="w-[80%] h-full border-tertiary border-[2px] border-dashed rounded-md ">
						<CategoryChart data={pieData} />
					</div>
				</div>

				<div className="w-[60%] h-full flex flex-col justify-center  border-tertiary border-[2px] border-dashed rounded-md relative">
				<div className="text-lg font-bold text-white absolute left-2 top-2">
						Products
					</div>
         <div className="flex justify-between w-full ">
				 <div className="w-[40%] h-full overflow-hidden flex justify-between items-center">
						<StatusChart data={statusPie} />
					</div>

					<div className="w-[60%] h-full flex gap-4 flex-col justify-center items-center">
						{statusPie.map((item) => (
							<StatusLabels
							key={item.name}
								name={item.name}
								value={item.value}
								total={productNumber}
								color={item.color}
							/>
						))}
					</div>
				 </div>

				</div>
			</div>

{/* SECOND ROW */}
			<div className="w-full flex justify-around items-center h-[400px] pt-7 ">

				<div className="w-[50%] h-full  flex justify-center items-start relative border-[2px] rounded-md border-dashed border-tertiary">
					<Reminders />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
