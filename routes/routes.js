const express=require('express');
const { signup,login } = require('../controllers/signup');
const {dummy}=require('../controllers/signup');

const router=express.Router();
// import middleware
const {auth,isStudent,isAdmin}=require('../middleware/auth')
// import controller
router.post('/signup',signup);
router.post('/login',login)

// protected route
router.get('/student', auth, isStudent),(req,res)=>{
    res.json({
        success:true,
        message:"welcome to protected route for student"
    })
};
router.get('/admin',auth, isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to protected route for admin"
    })
})
module.exports=router;