const express=require("express");
const router=express.Router();
const mongoose=require('mongoose');
const food_category=require('../data_models/food_category')
const food_items=require('../data_models/food_items')
router.post('/display', async(req,res)=>{

    const category= await food_category.find({});
    let items=await food_items.find();
    if(!category||!items){
        res.status(400).json({success:false,message:"failed to load data from database"})
    }
    res.status(200).json({success:true,message:"data successfully loaded from database",data:[category,items]});
    
})

module.exports=router;