const asyncHandler = require("express-async-handler");
const Category = require("../model/category");

const addCategory= asyncHandler(async (req, res) => {
	const {name,desc,author} = req.body;

	if (!name || !desc || !author) {
    res.status(400).json({message:"All fields required"});
		return;
	}

 	// Check Category Exsist
   const category = await Category.findOne({ name });
   if (category) {
    res.status(400).json({message:"Category already exsists"});
		return;
   }
 
   // Create New User
   const newCategory = await Category.create({
    name ,
		desc,
		author
   });

		res.status(200).json({message:"Category added",category:newCategory});

	
});


const getCategories = asyncHandler(async(req,res)=>{
	const userdata = req.user;
	const allCategories = await Category.find({author:userdata.id})
	res.status(200).json(allCategories)

})


const deleteCategory = asyncHandler(async(req,res)=>{
	var name = req.params.id;
	const deleted = await Category.findByIdAndDelete(name);
    res.status(200).json({message:"Category deleted"})	
})

module.exports = {addCategory,getCategories,deleteCategory};
