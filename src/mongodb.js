const dotenv=require('dotenv').config()
const mongoose=require('mongoose')
mongoose.connect(process.env.MDB_URL)
.then(()=>{
    console.log('mongodb connected....');
})
.catch((err)=>{
    console.log(err);
})
const LoginSchema=new mongoose.Schema({
    name:{
       type:String,
       required:true
    },
    password:{
        type:String,
       required:true
    }
})
const Collection=new mongoose.model(process.env.DB_NAME,LoginSchema)
module.exports=Collection