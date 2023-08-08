const mongoose=require('mongoose');
const express=require('express');
const app=express()
const Cors=require('cors')
require('./db/conn');
app.use(express.json());
app.use(Cors());
app.use(require('./Router/routes'))
app.use(require('./Router/display'))



app.listen(5000,()=>{
    console.log(`app is listening on port 5000`);
})
