const Admin=require('../models/AdminModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


const adminLogin= async (req,res)=>{
    const { email,password }=req.body;
    const login_data= await Admin.findOne({ email });
    // console.log(login_data);
    if(!login_data){
        res.status(400).json({
            message:"Email Can not match!"
        })
    }
    else{
        if(await bcrypt.compare(password,login_data.password)){
            const token=jwt.sign({id:login_data._id,name:login_data.name},process.env.JWT_SECRET,{
                expiresIn:'1d'
            });
            // console.log(token);
            res.status(200).json({
                id:login_data._id,
                name:login_data.name,
                email:login_data.email,
                cell:login_data.cell,
                token:token
            })
        }
        else{
            res.status(401).json({
                message:"Password Can not match!"
            })
        }
        
    }
    
}

module.exports={
    adminLogin
}