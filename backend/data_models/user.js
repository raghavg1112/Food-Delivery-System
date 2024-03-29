const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
location:{
    type:String,
    required:true
},
username:{
    type:String,
    required:true  
},
password:{
    type:String,
    required:true
},
date:{
    type:Date,
    default:Date.now()
}
})
const user=mongoose.model("User",userSchema);
module.exports=user;