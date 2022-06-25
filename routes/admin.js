const express=require('express');
const { adminAllData, adminAddData, adminUpdateData, adminDeleteData, adminSingleData, adminProfile, adminHome } = require('../controllers/adminController');
const { adminLogin } = require('../controllers/authController');
const { authCheck } = require('../middleware/adminMiddleware');
const router=express.Router();

router.post('/login',adminLogin);
router.get('/profile',authCheck,adminProfile);
router.get('/home',authCheck,adminHome);

router.get('/',adminAllData);
router.route('/').post(adminAddData);
router.route('/:id').get(adminSingleData).put(adminUpdateData).patch(adminUpdateData).delete(adminDeleteData);


module.exports=router;