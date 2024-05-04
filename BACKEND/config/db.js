
const mongoose=require('mongoose')
const colors=require('colors')
const connectDb=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongo db created:${conn,mongoose.connection.host}`.magenta.underline.bold);
    }catch(error){
        console.log(error);
        process.exit(1)
    }
}



module.exports=connectDb