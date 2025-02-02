import React, { useState } from "react";

const AddOrderList = ({ item, handle }) => {

	const [quantity, setQuantity] = useState(0);
	const [flag, setFlag] = useState(false);

	return (
		<div
			className={`w-full h-[60px] border-[1px] border-slate-300 flex justify-around items-center gap-4 p-2 rounded-lg ${
				flag ? "bg-secondary" : "bg-transparent"
			} `}
		>
			<div className="w-[85%] h-full flex items-center gap-4">
				<img src={item.photo} alt="" className="w-[90px] h-[40px] rounded-md" />
				<h1 className="text-md font-semibold">{item.name}</h1>
			</div>

			<div className="h-full flex justify-center items-center gap-4  w-[15%]">
				<input
					type="number"
					className="w-[55px] border-[1px] border-white bg-primary text-white text-center h-[90%] flex justify-center items-center"
					value={quantity}
					onChange={(e) => setQuantity(e.target.value)}
					readOnly={flag ? true : false}
					min={0}
					max={item.quantity}
				/>
				<div className="">
					{!flag ? (
						<button
							onClick={() => {
								if (quantity > 0) {
									handle(quantity, item._id,item.price);
									setFlag(true);
								}
							}}
							type="button"
							className="bg-optional text-white rounded-md pl-3 pr-3 pt-[1px] pb-[1px] font-medium border-white border-[1px]"
						>
							Add
						</button>
					) : (
						<button
							type="button"
							className="bg-green-500 text-white rounded-md pl-1 pr-1 pt-[1px] pb-[1px] font-medium"
						>
							Selected
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default AddOrderList;
