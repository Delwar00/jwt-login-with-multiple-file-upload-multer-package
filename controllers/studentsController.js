const fs =require("fs");
const path=require("path");
const Student=require('../models/StudentModel');
//data modeling
const students_data=fs.readFileSync(path.join(__dirname,'../data/students.json'));
const student_obj=JSON.parse(students_data);
// console.log(student_obj);

//all stu data
const AllStudentData=async (req,res)=>{
    const Students=await Student.find();
    // res.status(200).json(Students);
    if(Students.length > 0){
        res.status(200).json(Students);
    }
    else{
        res.status(400).json({
            message:"Data Not Found"
        });
    }

// student json data form student.json file

    // if(student_obj.length > 0){
    //     res.status(200).json(student_obj);
    // }
    // else{
    //     res.status(400).json({
    //         message:"Data Not Found"
    //     });
    // }

}
//single stu data
const SingleStudentData= async(req,res)=>{
    const id=req.params.id;
    const singleStudent=await Student.findById(id);
    res.status(201).json(singleStudent);
    // student json data form student.json file
    // if(student_obj.some(stu=>stu.id==id)){
    //     res.status(200).json(student_obj.find(stu=>stu.id==id));
    // }
    // else{
    //     res.status(400).json({
    //         message:"No Content"
    //     });
    // }
}
//post stu data
const AddStudentData=async (req,res)=>{
    const StudentCreate=await Student.create({
        name:req.body.name,
        age:req.body.age,
        skills:req.body.skills
    });
    res.status(201).json({
        message:"Data Added Successfully!"
    })
    // student create json data form student.json file

    // const {name,age,skills}=req.body;
    // student_obj.push({
    //     id:6,
    //     name:name,
    //     age:age,
    //     skills:skills
    // });
    // fs.writeFileSync(path.join(__dirname,'../data/students.json'),JSON.stringify(student_obj));
    // res.status(200).json({
    //     message:"Post Data Submited ok"
    // });
}
//Edit stu data
const EditStudentData=async(req,res)=>{
    const id=req.params.id;

    // await Student.findByIdAndUpdate(id,{
    //     name:req.body.name,
    //     age:req.body.age,
    //     skills:req.body.skills
    // },{
    //     new:true
    // });
    await Student.findByIdAndUpdate(id,req.body,{
        new:true
    });
    res.status(200).json({
        message:"Updated Data Successfully"
    });
    // student edit json data form student.json file

    // const {name,skills,age} = req.body;

    // console.log(student_obj[student_obj.findIndex(stu=>stu.id == id)]);
    // student_obj[student_obj.findIndex(stu=>stu.id == id)]={
    //     id:id,
    //     name: name,
    //     skills:skills,
    //     age:age
    //    };
    // fs.writeFileSync(path.join(__dirname,'../data/students.json'),JSON.stringify(student_obj));
    // res.status(200).json({
    //     message:"Update Data Submited ok"
    // });
}
//Delete stu data
const DeleteStudentData=async(req,res)=>{
    const id=req.params.id;
    const delete_student=await Student.findByIdAndDelete(id);
    res.status(200).json({
        message:"Deleted Data Successfully"
    });
    // student delete json data form student.json file

    // const updated_data=student_obj.filter(stu=>stu.id != id);
    // fs.writeFileSync(path.join(__dirname,'../data/students.json'),JSON.stringify(updated_data));
    // res.status(200).json({
    //     message:"Deleted Data Successfully"
    // });
}
module.exports={
    AllStudentData,
    AddStudentData,
    SingleStudentData,
    EditStudentData,
    DeleteStudentData
}