import mongoose from "mongoose";

export const connectDB = async ()=>{
    
await mongoose.connect('mongodb+srv://musharrafsiddiqui712_db_user:AWetKiIpBkgMkxST@cluster0.7qixo0j.mongodb.net/food-d').then(()=>console.log("dbconnected"))

}


