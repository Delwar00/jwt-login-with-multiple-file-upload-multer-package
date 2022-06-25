const express=require('express');
const router=express.Router();
 const {AllStudentData,AddStudentData,SingleStudentData,EditStudentData,DeleteStudentData}=require('../controllers/studentsController');
//students route

router.route('/').get(AllStudentData).post(AddStudentData);
router.route('/:id').get(SingleStudentData).put(EditStudentData).patch(EditStudentData).delete(DeleteStudentData);

module.exports=router;