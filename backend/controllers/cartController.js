import userModel from "../models/userModel.js";

//add item to cart
const add = async (req, res) => {
  try { 
    const userData = await userModel.findById(req.userId);
    if(!userData){
        return res.status(400).json({success:false,message:'user not found'})
    }
    const cartData = userData.cartData;
    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId]=1
    }else{
        cartData[req.body.itemId]+=1
    };
    await userModel.findByIdAndUpdate(req.userId,{cartData})
   return res.status(200).json({success:true,message:'Item Added'})
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "error" });
  }
};

//remove item to cart
const remove = async (req, res) => {
    try{
          const userData = await userModel.findById(req.userId)
    if(!userData){
        return res.status(400).json({success:false,message:'user not found'})
    }
    const cartData = userData.cartData
    if(!cartData[req.body.itemId]){
        return res.status(400).json({success:false,message:"item not in cart"})
    }
    if(cartData[req.body.itemId]>1){
        cartData[req.body.itemId] -= 1
    }else{
        delete cartData[req.body.itemId]
    }
    await userModel.findByIdAndUpdate(req.userId,{cartData})
    return res.status(200).json({success:true,cartData})
    }catch(err){
        console.log(err)
       return res.status(500).json({success:false,message:'error'})
    }
};

// fetch item to cart
const get = async (req, res) => {
    try{
        const userId = req.userId
        if(!userId){
            return res.status(400).json({success:false,message:"Log in or create an account to continue."})
        }
    const userData = await userModel.findById(userId)
    const cartData = userData.cartData
    return res.status(200).json({success:true,cartData})

    }catch(err){ 
        console.log(err)
        return res.status(500).json({success:false,message:'error'})
    }

};


export {add,remove,get} 