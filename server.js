const express=require('express');
const colors=require('colors');
const dotenv=require('dotenv');
const multer=require('multer');
const path=require('path');
const mongoDBconnect=require('./config/db');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file.fieldname=='photo'){
            cb(null,'./media/users/')
        }
        else if(file.fieldname=='cv'){
            cb(null,'./media/cv/')
        }
    },
    filename:(req,file,cb)=>{
        if(file.fieldname=='photo'){
            const file_extension=path.extname(file.originalname);
            cb(null,file.originalname+'-'+Date.now()+'-'+Math.round(Math.random())+file_extension);
        }
        else if(file.fieldname=='cv'){
            const file_extension=path.extname(file.originalname);
            cb(null,file.originalname+'-'+Date.now()+'-'+Math.round(Math.random())+file_extension);
        }
    }
});
const upload=multer({
    storage:storage,
    limits:(1024*1024),
    fileFilter:(res,file,cb)=>{
        // console.log(file)
        if(file.fieldname=='photo'){
            if(file.mimetype=='image/jpeg' || file.mimetype=='image/jpg' || file.mimetype=='image/png' || file.mimetype=='image/svg' || file.mimetype=='image/gif'){
                cb(null,true)
            }
            else{
                console.log("inavlid image format")
            }
            
        }
        else if(file.fieldname=='cv'){
            if(file.mimetype=='application/pdf'){
                cb(null,true)
            }
            else{
                console.log("inavlid Cv format")
            }
        }
    }
});
//db initialize
mongoDBconnect();
const app=express();
//environment setup
dotenv.config();
PORT=process.env.SERVER_PORT;

//express setup for post format data submit
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//students routes
app.use('/api/students',require('./routes/students'));

//admin routes
const cpUpload=upload.fields([
    {
        name:'photo',
        maxCount:12
    },
    {
        name:'cv',
        maxCount:1
    }    
]);
app.use('/api/admin',require('./routes/admin'));
app.post('/upload',cpUpload,(req,res)=>{
    res.send("hello")
});

//app listener
app.listen(PORT,()=>{
    console.log(`Our Server is running on ${PORT} port`);
})
