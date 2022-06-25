const mongoose=require('mongoose');

const adminModel=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name Must be Filled']
    },
    email:{
        type:String,
        required:[true,'Email Must be Filled'],
        unique:true
    },
    cell:{
        type:String,
        required:[true,'Cell Must be Filled'],
        unique:true
    },
    username:{
        type:String,
        required:[true,'Username Must be Filled'],
        unique:true,
        lowercase:true,
        minlength:5,
        maxlength:10
    },
    location:{
        type:String,
        required:false,
        default:"Dhaka"
    },
    skill:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    }
    
},{
    timestamps:true
});

module.exports=mongoose.model('Admin',adminModel);