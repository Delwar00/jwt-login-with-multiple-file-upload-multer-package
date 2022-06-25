const mongoose=require('mongoose');

const StudentModel=mongoose.Schema({
    name:String,
    age:Number,
    skills:String
},{
    timestamps:true
});

module.exports=mongoose.model('Student',StudentModel);