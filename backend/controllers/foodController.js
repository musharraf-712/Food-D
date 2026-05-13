import foodModel from "../models/foodmodel.js";
import fs from 'fs'

//add food items
const addFood = async (req,res)=>{
   if(!req.file){
      return res.json({success:false, message: "image required"})
   }
 let image_filename= `${req.file.filename}`
 const food = new foodModel({
     name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:image_filename
 })
 try{
    await food.save()
    res.json({success:true,message:"food added"})
 }catch(err){
    res.json({success:false,message:"error"})
 }
}

// all food list 
const listFood = async (req,res)=>{
   try{
         const list =await foodModel.find({})
         res.json({success:true,data:list})
   }catch(err){
      console.log("error")
      res.json({success:true,message:"error"})
   }
}

//remove food item
const removeFood = async (req,res)=>{
   try{
      const food = await foodModel.findById(req.body.id)
      fs.unlink(`uploads/${food.image}`,()=>{})

          await foodModel.findByIdAndDelete(req.body.id)

   res.json({
      
      success:true,
      message:"item removed"
   })
   }catch(err){
      console.log("error")
      res.json({success:false,message:"Error"})
   }
}


export {addFood,listFood,removeFood}