const mongooes=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

PORT=process.env.SERVER_PORT;
MONGO_DB=process.env.MONGO_DB;

const mongoDBconnect=async ()=>{
    try{
        let connect=await mongooes.connect(MONGO_DB);
        console.log(`Database connection set Successfully ${connect.connection.host}`.green);
    }
    catch(err){
        console.log(`${err}`.red);
    }
} 
module.exports=mongoDBconnect;