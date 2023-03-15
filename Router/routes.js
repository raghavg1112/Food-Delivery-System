const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../data_models/user');
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

router.post('/signUp', [
    body('name').isLength({ min: 5 }),
    body('email').isEmail()
], async (req, res) => {
    
    const { name, location, email, password } = req.body;

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({ success: false, message: "Enter valid credentials" });
    }

    const check = await User.findOne({ email: email })
    if (check) {
        console.log(`found______found_________found________`);
        return res.status(200).send({ success: false, message: "Username already exists" });
    }
    const secure_pass = await bcrypt.hash(password, 10);
    const user = new User({ name, location, email, password: secure_pass });
    user.save().then(() => {
        console.log(`saved`);
        res.status(200).json({ success: true })
    }).catch((err) => {
        console.log(`failed`);
        res.status(522).json({ succss: false, message: "Failed to Create your Account" })
    })
})

router.post('/login', [
    body('username').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
  
    const validate = validationResult(req.body);
    if (!validate) {
        return res.status(422).json({ success: false });
    }
    const { username, password } = req.body;
    const find = await User.findOne({ email: username });
    if (!find) {
        
        return res.status(422).json({ success: false, message: "Username dosen't exists" });
    }
    console.log(find.password);
    await bcrypt.compare(find.password, password,(err,data)=>{
       
        if (err) {
            return res.status(200).json({ success: false, message: "Incorrect password" });
        }
        return res.status(200).json({ success: true,message:"Login Successfull"});
    })
   
})
module.exports = router;