const Admin=require('../models/AdminModel');
const jwt=require('jsonwebtoken');


const authCheck=async(req,res,next)=>{
    if(req.headers.authorization){
        const token=req.headers.authorization.split(' ')[1];
        // console.log(token);
        const token_verify=jwt.verify(token,process.env.JWT_SECRET);
        // console.log(token_verify);
        req.login_user=await Admin.findById(token_verify.id);
        // console.log(login_data);
        next();
        
    }
    else{
        res.json({
            message:"Token not found!"
        });
    }
}

module.exports={
    authCheck
}