const asyncHandler = require("express-async-handler");
const User = require("../model/user");
const jwt = require("jsonwebtoken") //TO GENERATE TOKEN
const bcrypt = require("bcrypt")




//Public //api/users/register //Post
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, phone, position } = req.body;

	if (!name || !email || !password || !phone || !position) {
		res.status(400).json({
			message: "All fields are required",
		});
		return;
	}

	const user = await User.findOne({ email });
	if (user) {
		res.status(400).json({
			message: "User already exsists",
		});
		return;
	}

	const hashedPassword = bcrypt.hashSync(password, 12);

	const newUser = await User.create({
		name,
		email,
		password: hashedPassword,
		phone,
		position,
	});

	res.status(200).json({ message: "User Created Successfully", user: newUser });
	return;
});

//Public //api/users/login //Post
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).json({
			message: "All fields are required",
		});
		return;
	}

	const user = await User.findOne({ email });

	if (!user) {
		res.status(400).json({
			message: "User doesnt exsists",
		});
		return;
	}

	const flag = await bcrypt.compare(password, user.password);

	if (!flag) {
		res.status(400).json({
			message: "Invalid email or password",
		});
		return;
	}

	const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
		expiresIn: "1h",
	});
	res.status(200).json({ token });
	return;
});


//Protected //api/users/getuser //Get
const getUser = asyncHandler(async (req, res) => {
	const token = req.headers.authorization?.split(" ")[1];
	
	const verified = jwt.verify(token, process.env.JWT_TOKEN);
	const user = await User.findById(verified.id);
  res.status(200).json({message:"User found",user:user});
  
});


//Public //api/users/checklogin //Get
const checkLogin = asyncHandler(async (req,res)=>{
 
  const token = req.cookies.token;
  if(!token){
   return res.json(false)
  }
  // Verify Token
  const verified = jwt.verify(token , process.env.JWT_TOKEN);
  const user = await User.findById(verified.id);

  if(!user){
    return res.json(false)
  }
  else{
    return res.json(true)
  }

})




module.exports = {registerUser,loginUser,getUser,checkLogin};
