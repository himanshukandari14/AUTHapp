const express=require('express');
const { signup,login } = require('../controllers/signup');
const {dummy}=require('../controllers/signup');

const router=express.Router();

// import controller
router.post('/signup',signup);
router.post('/login',login)

router.get('/dummy',(req,res)=>{
    res.send("hsdkshadgsajd")
})
module.exports=router;