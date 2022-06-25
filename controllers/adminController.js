const Admin=require('../models/AdminModel');
const bcrypt=require('bcryptjs');

//addmin all data
const adminAllData=async(req,res)=>{
    const data=await Admin.find();
    res.status(200).json(data);
}

//addmin Single data
const adminSingleData=async(req,res)=>{
    const id=req.params.id;
    const singleAdminData=await Admin.findById(id);
    res.status(200).json(singleAdminData);
}

//addmin Post data
const adminAddData=async(req,res)=>{
    const {name,email,cell,username,location,skill,password}=req.body;
    //hash password
    const salt=bcrypt.genSaltSync(10);
    const hash_password=bcrypt.hashSync(password,salt);
    // console.log(hash);

    const admin=await Admin.create({
        ...req.body,
        password:hash_password
    });
    res.status(200).json({
        message:"Admin Add data Succesffully"
    })
}

//addmin Update data
const adminUpdateData=(req,res)=>{
    res.status(200).json({
        message:"Admin Update data Succesffully"
    })
}

//addmin Delete data
const adminDeleteData=async(req,res)=>{
    const id=req.params.id;
    const have_deleted_data=await Admin.findById(id);
    if(have_deleted_data){
        const deleted_data=await Admin.findByIdAndDelete(id);
        res.status(200).json({
            message:`Admin Delete ${have_deleted_data.name} data Succesffully`
        })
    }
    else{
        res.status(400).json({
            message:"Admin Delete Data Not Found"
        })
    }
    
}
const adminProfile=(req,res)=>{
    res.json(req.login_user);
}
const adminHome=(req,res)=>{
    res.json(req.login_user);
}
module.exports={
    adminAllData,
    adminSingleData,
    adminAddData,
    adminUpdateData,
    adminDeleteData,
    adminProfile,
    adminHome
}