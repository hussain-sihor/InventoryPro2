const asyncHandler = require("express-async-handler");
const Reminder = require("../model/reminder");



const addReminder= asyncHandler(async (req, res) => {
	const {task,author} = req.body;
	if (!task ) {
    res.status(400).json({message:"All fields required"});
	}

 	// Check Category Exsist
   const reminder = await Reminder.findOne({ task });
   if (reminder) {
     res.status(400).json({message:"Reminder already exsists"});
   }
 
   // Create New Reminder
   const newReminder = await Reminder.create({
		task,author
   });

   if (newReminder) {
		res.status(200).json(newReminder);

	}
});

const getReminders = asyncHandler(async(req,res)=>{
	const userdata = req.user;
	const allReminders = await Reminder.find({author:userdata.id})
	res.status(200).json(allReminders)

})

const deleteReminder = asyncHandler(async(req,res)=>{
	var task = req.params.id;
	// console.log(name)
	const deleted = await Reminder.findByIdAndDelete(task);
    res.status(200).json(deleted)	
})

module.exports = {addReminder,getReminders,deleteReminder};
