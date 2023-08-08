const mongoose=require('mongoose');
const category=new mongoose.Schema({
    CategoryName:{
        type:String,required:true
    }
})
const food_category=mongoose.model("food_category",category);
module.exports=food_category;