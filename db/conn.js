const mongoose=require('mongoose');
mongoose.set('strictQuery', true);
const db="mongodb+srv://Raghav:raghav1112@cluster0.mgwmrxf.mongodb.net/hatti?retryWrites=true&w=majority"
mongoose.connect(db).then(async()=>{
    console.log(`connected successfully to database`);
}).catch((err)=>{
    console.log(`error connceting to databse, ${err}`);
})
