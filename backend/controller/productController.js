const asyncHandler = require("express-async-handler");
const Product = require("../model/product");

const addProduct = asyncHandler(async (req, res) => {
	const {name,category,desc,quantity,price,supplier,level,author,photo,status} = req.body;
	if (!name || !category || !desc || !quantity || !price || !supplier || !level || !author || !photo || !status) {
    res.status(400).json({message:"All fields required"});
    return
	}


 	// Check Product Exsist
   const product = await Product.findOne({ name });
   if (product) {
    res.status(400).json({message:"Product already exsists"});
    return
   }
 
   // Create New User
   const newProduct = await Product.create({
    name ,
		category,
		desc,
		quantity,
		price,
		supplier,
		level,
		author,
		photo,
		status,
   });
	 res.status(200).json({product:{newProduct},message:"Product created successfully"})
	 return;

 
});


const getProducts = asyncHandler(async(req,res)=>{
	const userdata = req.user;
	const allProducts = await Product.find({author:userdata.id});
	res.status(200).json(allProducts)

})

const getProduct = asyncHandler(async(req,res)=>{
	const id = req.params.id;
	const product = await Product.findById(id)
	res.status(200).json(product)

})


getStatusProducts = asyncHandler(async(req,res)=>{
	const {status} = req.body;
	const userdata = req.user;
	if (!status) {
    res.status(400).json({message:"All fields required"});
   return;
	}

	const allProducts = await Product.find({author:userdata.id,status:status});
	res.status(200).json(allProducts)
})

getCategoryProducts = asyncHandler(async(req,res)=>{
	const {category} = req.body;
	const userdata = req.user;
	if (!category) {
    res.status(400).json({message:"All fields required"});
    return;
	}

	const allProducts = await Product.find({author:userdata.id,category:category});
	res.status(200).json(allProducts)
})

const updateProduct = asyncHandler(async (req,res)=>{
	const id = req.params.id;
	const body = req.body
	const product = await Product.findByIdAndUpdate(id,body);
	res.status(200).json(product)
})

const deleteProduct = asyncHandler(async (req,res)=>{
	const id = req.params.id;
	const deleted = await Product.findByIdAndDelete(id);
	res.status(200).json(deleted)	
})


module.exports = {addProduct,getProducts,getProduct,getStatusProducts,getCategoryProducts,updateProduct,deleteProduct};
