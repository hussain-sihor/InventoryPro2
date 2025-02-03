const express = require("express");
const connectDB = require("./db");
require('dotenv').config();
// TO ACCESS .ENV FILE
const bodyParser = require("body-parser") // TO ACCESS REQUEST BODY
const cors = require("cors");
const PORT = process.env.PORT || 5000;
var cookieParser = require('cookie-parser');
const authMiddleware = require("./middleware/authMiddleware")

const app = express();
connectDB()



const corsOptions = { origin: "https://inventoryproo.vercel.app",methods:"GET,POST,PUT,PATCH,POST,DELETE", credentials: true }

app.use(cors(corsOptions));

app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());



// ROUTES
app.use("/api/users",require("./routes/userRoute"));
app.use("/api/products",authMiddleware,require("./routes/productRoute"));
app.use("/api/categories",authMiddleware,require("./routes/categoryRoute"));
app.use("/api/orders",authMiddleware,require("./routes/orderRoute"));
app.use("/api/reminders",authMiddleware,require("./routes/reminderRoute"));

app.get("/",(req,res)=>{
  res.status(200).send("Hello...");

})




app.listen(PORT,()=>{
  console.log(`Server listening on ${PORT}`)
})
