const asyncHandler = require("express-async-handler");
const Order = require("../model/order");
const Product = require("../model/product");


// orderNumber ,
// 		customerId,
// 		customerName,
//    customerPhone
//    customerEmail
// 		  orderDate,  default
// 		status,       default
// 		paymentMethod,
// 		shippingAddress,
// 		billingAddress,
// 		shippingCost,
// 		items,
// 		discount,
// 		totalAmount,

const addOrder = asyncHandler(async (req, res) => {
	const {orderNumber,customerId,customerName,customerPhone,customerEmail,paymentMethod,shippingAddress,shippingCost,items,discount,totalAmount,author} = req.body;

	if (!orderNumber || !customerId || !customerName || !customerPhone || !customerEmail || !paymentMethod || !shippingAddress || !shippingCost || !items || !discount || !totalAmount || !author) {
		res.status(400).json({message:"All fields required"});
		return;
	}

 	// Check Product Exsist
   const order = await Order.findOne({author , orderNumber });
   if (order) {
     res.status(400).json({message:"Order already exsists"});
     return;
   }
 
   // Create New User
   const newOrder = await Order.create({
    orderNumber ,
		customerId,
		customerName,
		customerEmail,
		customerPhone,
		paymentMethod,
		shippingAddress,
		shippingCost,
		items,
		discount,
		totalAmount,
		author,
   });

		res.status(200).json({newOrder});
});


const getOrders = asyncHandler(async(req,res)=>{
	const userdata = req.user;

	const allOrders = await Order.find({author : userdata.id})
	res.status(200).json(allOrders)

})


const getOrder = asyncHandler(async(req,res)=>{
  const order = await Order.findById(req.params.id)
	res.status(200).json(order)
})

const updateOrder = asyncHandler(async (req,res)=>{
	const id = req.params.id;
	const body = req.body
	const order = await Order.findByIdAndUpdate(id,body);
	res.status(200).json(order)
})

getStatusOrders = asyncHandler(async(req,res)=>{
	const {status} = req.body;

	if (!status) {
		res.status(400).json({message:"All fields required"});
		return;
	}

	const allOrders = await Order.find({status:status});
	res.status(200).json(allOrders)
})

module.exports = {addOrder,getOrders,getOrder,updateOrder,getStatusOrders};
