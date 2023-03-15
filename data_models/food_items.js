const mongoose=require('mongoose');
const items= new mongoose.Schema({
    CategoryName:{
        type:String
    },
    name:String,
    img:String,
    options:Array,
    description:String
});
const food_items=mongoose.model("food_item",items)
module.exports=food_items;