const mongoose = require("mongoose")

const connectDB = async()=>{
  try{
    const connect = mongoose.connect(process.env.MONGO_URI).then(()=>{
      console.log("DB Connected")
    }
    )
  }catch(error){
    console.log(error);
  }
 
}

module.exports = connectDB;