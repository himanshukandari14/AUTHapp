// auth, is student, isAdmin
const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.auth=(req,res,next)=>{
    try {
        // extreact jwt token
        const token=req.body.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token missing"
            })
        }
        // verify token
        try {
            const payload=jwt.verify(token,process.env.SECRET);
            console.log(payload);

            req.user=payload;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"token invalid"
            });

        }
        next();
        
        
    } catch (error) {
        return res.status(500).json({
                success:false,
                message:"something went wrong"
            });
    }
}

exports.isStudent=()=>{
    try {
        if(req.user.role !== "student"){
             return res.status(401).json({
                success:false,
                message:"this is protected route for studnet"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
                success:false,
                message:"user role not matching"
            });
    }
}


exports.isAdmin=()=>{
    try {
        if(req.user.role !== "admin"){
             return res.status(401).json({
                success:false,
                message:"this is protected route for admin"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
                success:false,
                message:"user role not matching"
            });
    }
}