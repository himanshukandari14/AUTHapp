const mongoose=require('mongoose');
const Usermodel=require('../models/User');
const bcrpyt=require('bcrypt');
const jwt=require('jsonwebtoken');
exports.signup=async(req,res)=>{
    
    console.log("sign up working djhld");
    const{name,email,password}=req.body;
    const hashedPassword=await bcrpyt.hash(password,10);
    try {
        const existingUser=await Usermodel.findOne({email});
        if(existingUser){
            console.log("user already exists")
        }
        const user= await Usermodel.create({
            name,
            email,
            password:hashedPassword,
        })
        return res.status(200).json({
            success:true,
            data:user,
            message:"user created"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error in creating the user"
        })
    }
}

exports.login=async(req,res)=>{
    const{email,password}=req.body;
    try {
        //check emty fields
    if(!email || password){
        console.log("please fill all the fiels")
    }
    let user=await Usermodel.findOne({email});
    if(!user){
        return res.status(401).json({
            success:false,
            message:"please sign up first"
        })
    }

    // verify pass and generate jwt token 
    const payload={
        email:user.email,
        id:user._id,
        role:user.role,
    };
    if(await bcrpyt.compare(password,user.password)){
        // pass match
        let token=jwt.sign(payload,process.env.SECRET,{
            expiresIn:"2h",
        })
        user= user.toObject();
        user.token=token;
        user.password=undefined //removing pass from obj not db
        const options={
            expires: new Date(Date.now()+3*24*60+60*1000),
            httpsOnly:true,

        }
        res.cookie("token",token, options).status(200).json({
            success:true,
            user,
            token,
            message:"user logged in successfully"
        })
    }else{
        // pass does not match
        return res.json(403).json({
            success:false,
            message:"wrong pass"
        })
    }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"cannot login"
        })
    }
    
}
exports.dummy=async(req,res)=>{
    res.send('test')
}